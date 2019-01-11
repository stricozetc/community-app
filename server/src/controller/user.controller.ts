import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { UserAuthenticationRepository } from 'service/user-authentication';

import {
  validateEmail,
  validateLoginInput,
  validateRegisterInput,
  validateSetLanguage
} from 'validation';

import { User } from 'interfaces/User';
import { technicalErr } from 'errors/technicalErr';

@controller('/api/users')
export class UserController {

  constructor(@inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository) {
  }

  /**
   * @param {Request} request - data from request
   * @param {UserFieldsToRegister} request.body - user data for registration
   * after successful validation input data,
   * controller return user data
   */
  @httpPost('/register')
  public postRegister(request: Request, response: Response): Promise<Response | User> | Response {
    const { errors, isValid } = validateRegisterInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }
    return this.userAuthenticationRepository.registerUser(request.body)
      .catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }
 
  /**
   * @param {Request} request - data from request
   * @param {User} request.body - user data for login
   * after successful validation input data,
   * controller return Promise<{ success: boolean, token: string }>
   */

  @httpPost('/login')
  public postLogin(request: Request, response: Response): Promise<Response | { success: boolean, token: string }> | Response {
    const { errors, isValid } = validateLoginInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    return this.userAuthenticationRepository.loginUser(request.body)
      .catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }

  /**
   * @param {Request} request - data from request
   * @param {object} request.body - data from request
   * @param {string} request.body.userEmail - user email
   * @param {string} request.body.userLanguage - language data
   * after successful validation input data,
   * controller return Promise<{ success: boolean, token: string }>
   */
  @httpPost('/user-language')
  public async userLanguage(request: Request, response: Response): Promise<Response> {
    const userEmail: string = request.body.userEmail;
    const userLanguage: string = request.body.userLanguage.toLowerCase();

    const { errors, isValid } = validateSetLanguage(userEmail, userLanguage);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    try {
      const result = await this.userAuthenticationRepository.setUserLanguage(userEmail, userLanguage);
      if (result) {
        return response.sendStatus(200);
      } else {
        return response.sendStatus(500).json(technicalErr.userLanguageIsNotUpdatedInDb);
      }
    } catch (error) {
      return response.status(500).json(error);
    }

  }

  /**
   * @param {Request} request - data from request
   * @param {object} request.query - data from request
   * @param {string} request.query.email - user email
   * after successful validation email,
   * controller return user language from db
   */
  @httpGet('/get-user-language')
  public async getUserLanguage(request: Request, response: Response): Promise<Response> {
    const userEmail: string = request.query.email;

    const { errors, isValid } = validateEmail(userEmail);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    try {
      const language = await this.userAuthenticationRepository.getUserLanguage(userEmail);
      return response.status(200).send(language);
    } catch (error) {
      return error.code >= 2000 ?
        response.status(500).json(error) :
        response.status(400).json(error);
    }
  }

  /**
   * @param {Request} request - data from request
   * @param {object} request.body - data from request
   * @param {string} request.body.email - user email
   * @param {string} request.body.name - user name
   * @param {string} request.body.language - user language
   * @param {string} request.body.accessToken - user accessToken
   * @param {string} request.body.imageUrl - user imageUrl
   * after successful validation input data,
   * controller return Promise<{ success: boolean, token: string }>
   */
  @httpPost('/google-auth')
  public async googleAuth(request: Request, response: Response): Promise<Response | { success: boolean, token: string }> {
    const { email, name, language, accessToken, imageUrl } = request.body;
    // (Mikalai) Add validation
    try {
      return this.userAuthenticationRepository.socialNetworksLogin(email, name, language, accessToken, imageUrl);
    } catch (error) {
      return error.code >= 2000 ?
        response.status(500).json(error) :
        response.status(400).json(error);
    }
  }

  /**
   * @param {Request} request - data from request
   * @param {object} request.body - data from request
   * @param {number} request.body.id - user id
   * if user with this id is exist then return roleId
   */
  @httpGet('/get-user-role')
  public async getUserRole(req: Request, res: Response): Promise<void | Response> {
    try {
      const roleId: number = await this.userAuthenticationRepository.getUserRole(req.body.userId);

      return res.status(200).json(roleId);
    } catch (err) {
      return res.status(500).json(err.msg);
    }
  }

  @httpPost('/get-user-links')
  public async getUserLinks(req: Request, res: Response): Promise<void | Response> {
    try {
      const userLinks: string[] = await this.userAuthenticationRepository.getUserLinks(req.body.userId);

      return res.status(200).json(userLinks);
    } catch (err) {

      return res.status(500).json(err.msg);
    }
  }
}
