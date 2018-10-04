package com.battle.net.utils;

import com.epam.reportportal.message.ReportPortalMessage;
import com.epam.reportportal.service.ReportPortal;
import io.restassured.filter.FilterContext;
import io.restassured.filter.OrderedFilter;
import io.restassured.internal.support.Prettifier;
import io.restassured.response.Response;
import io.restassured.specification.FilterableRequestSpecification;
import io.restassured.specification.FilterableResponseSpecification;
import rp.com.google.common.io.ByteSource;

import java.util.Date;
import java.util.Objects;

public class ReportPortalLogApi implements OrderedFilter {
    private static final String TEXT_JSON = "text/json";

    @Override
    public int getOrder() {
        return 41;
    }

    @Override
    public Response filter(FilterableRequestSpecification rqSpec,
                           FilterableResponseSpecification rsSpec,
                           FilterContext filterContext) {
        String msg = rqSpec.getMethod() + " to " + rqSpec.getURI();
        attachAsJson(msg, toBytes(rqSpec));
        //log.info("RP_MESSAGE#BASE64#{}#{}", BaseEncoding.base64().encode(toBytes(rqSpec)), msg);
        Response response = filterContext.next(rqSpec, rsSpec);
        attachAsJson(response.getStatusLine(), toBytes(response));
        //log.info("RP_MESSAGE#BASE64#{}#{}", BaseEncoding.base64().encode(toBytes(response)), response.getStatusLine());
        return response;
    }

    private void attachAsJson(String attachmentName, byte[] attachment) {
        ReportPortalMessage rpMsg = new ReportPortalMessage(ByteSource.wrap(attachment), TEXT_JSON, attachmentName);
        ReportPortal.emitLog(rpMsg, "info", new Date());
    }

    private byte[] toBytes(FilterableRequestSpecification request) {
        String result = request.getMethod() + " to " + request.getURI() + "\n\nHeaders:\n" + request.getHeaders();
        if (Objects.nonNull(request.getBody())) {
            result += "\n\nBody:\n" + new Prettifier().getPrettifiedBodyIfPossible(request);
        }
        return result.getBytes();
    }

    private byte[] toBytes(Response response) {
        String result = "Status code " + response.getStatusCode();
        if (!response.getBody().asString().equals("")) {
            result += "\n\nBody:\n" + new Prettifier().getPrettifiedBodyIfPossible(response, response.getBody());
        }
        result += "\n\nHeaders:\n" + response.getHeaders();
        result += "\n\nCookies:\n" + response.getDetailedCookies();
        return result.getBytes();
    }
}
