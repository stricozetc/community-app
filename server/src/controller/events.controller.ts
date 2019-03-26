import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { EventsRepository } from 'service/events';
import { Event, EventModel } from 'models';

@controller('/api/events')
export class GameEventsContoller {

    public constructor(
        @inject(EventsRepository) private eventsRepository: EventsRepository
    ) {
    }

    @httpPost('/add-event')
    public async addEvent(req: Request, res: Response): Promise<void | Response> {
        const { event, userId }: EventModel = req.body;
        try {
            await this.eventsRepository.addEvent(event, userId);

            return res.sendStatus(200);
        } catch (err) {

            return res.status(400).json(err.msg);
        }
    }

    @httpPost('/delete-event')
    public async deleteEvent(req: Request, res: Response): Promise<void | Response> {
        const { eventId, userId }: { eventId: number, userId: number } = req.body;
        try {
            await this.eventsRepository.deleteEvent(eventId, userId);

            return res.sendStatus(200);
        } catch (err) {
            return res.status(400).json(err.msg);
        }
    }

    @httpPost('/edit-event')
    public async editEvent(req: Request, res: Response): Promise<void | Response> {
        const { event, userId }: { event: Event, userId: number } = req.body;
        try {
            await this.eventsRepository.editEvent(event, userId);

            return res.sendStatus(200);
        } catch (err) {
            return res.status(500).json(err.msg);
        }
    }

    @httpGet('/get-events')
    public async getEvents(req: Request, res: Response): Promise<void | Response> {
        try {
            const events: Event[] = await this.eventsRepository.getEvents();

            return res.status(200).json(events);
        } catch (err) {
            return res.status(500).json(err.msg);
        }
    }

    @httpGet('/get-event')
    public async getEvent(req: Request, res: Response): Promise<void | Response> {
        const eventId: number = req.query.id;
        try {
            const event: Event = await this.eventsRepository.getEvent(eventId);

            return res.status(200).json(event);
        } catch (err) {
            return res.status(400).json(err.msg);
        }
    }
}
