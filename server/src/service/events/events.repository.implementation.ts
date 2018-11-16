import { injectable, inject } from 'inversify';
import { EventsRepository } from 'service/events/events.repository';
import { Event, EventModel } from 'models';
import { LoggerService } from 'service/logger';

@injectable()
export class EventsRepositoryImplementation implements EventsRepository {

  @inject(LoggerService) private loggerService: LoggerService;

  public async addEvent(event: Event): Promise<void> {
    const gameEvent = EventModel.build({
      id: event.id,
      title: event.title,
      description: event.description,
      city: event.description,
      place: event.place,
      address: event.address,
      location: event.locationX,
      begginingInTime: event.begginingInTime,
      begginingDate: event.begginingDate
    });

    try {
      await gameEvent.save();
      this.loggerService.infoLog(`event with id ${event.id} saved succesfull`);
    } catch (err) {
      this.loggerService.errorLog('sequilize add event error');

      throw { message: 'sequilize add event error' };
    }
  }

  public async deleteEvent(eventId: number): Promise<void> {
    try {
      await EventModel.destroy({
        where: {
          id: eventId
        }
      });
      this.loggerService.infoLog(`event with id ${eventId} deleted succesfull`);
    } catch (err) {
      this.loggerService.errorLog('sequilize delete event error');

      throw { message: 'sequilize delete event error' };
    }
  }

  public async editEvent(event: Event): Promise<Event[]> {
    try {
      await EventModel.update(
        {
          id: event.id,
          title: event.title,
          description: event.description,
          city: event.description,
          place: event.place,
          address: event.address,
          location: event.locationX,
          begginingInTime: event.begginingInTime,
          begginingDate: event.begginingDate
        },
        {
          where: { id: event.id }
        });
      const updatedEvent = await EventModel.findAll({
        where: {
          id: event.id
        }
      });
      this.loggerService.infoLog(`event with id ${event.id} edited succesfull`);

      return updatedEvent;
    } catch (err) {
      this.loggerService.errorLog('sequilize edit event error');

      throw { message: 'sequilize edit event error' };
    }
  }

  public async getEvents(): Promise<Event[]> {
    try {
      const events = await EventModel.findAll();
      this.loggerService.infoLog(` ${events.length - 1} events get succesfull`);

      return events;
    } catch (err) {
      this.loggerService.errorLog('sequilize get events error');

      throw { message: 'sequilize get events error' };
    }
  }

  public async getEvent(eventId: number): Promise<Event> {
    try {
      const event = await EventModel.findOne({ where: { id: eventId } });
      this.loggerService.infoLog(`event ${eventId} get succesfull`);

      return event;
    } catch (err) {
      this.loggerService.errorLog('sequilize get event error');

      throw { message: 'sequilize get event error' };
    }
  }
}
