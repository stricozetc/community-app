import { injectable, inject } from 'inversify';
import { EventsRepository } from 'service/events/events.repository';
import { Event, EventModel, UserRoles, Roles, RolesId } from 'models';
import { LoggerService } from 'service/logger';
import { technicalErr } from 'errors';

@injectable()
export class EventsRepositoryImplementation implements EventsRepository {

  @inject(LoggerService) private loggerService: LoggerService;

  public async addEvent(event: Event, id: number): Promise<void> {
    try {
      const user = await UserRoles.findOne({
        where: {
          userId: id,
          roleId: RolesId.Admin
        }
      });

      if (user) {
        const gameEvent = EventModel.build({
          id: event.id,
          title: event.title,
          description: event.description,
          city: event.description,
          place: event.place,
          address: event.address,
          locationX: event.locationX,
          begginingInTime: event.begginingInTime,
          begginingDate: event.begginingDate
        });
        
        await gameEvent.save();
        this.loggerService.infoLog(`event with id ${event.id} added succesfull`);
      } else {
        this.loggerService.infoLog(`user with id ${id} is not admin`);

        throw { msg: `user with id ${id} is not admin` };
      }
    } catch (err) {
      if (err.msg) {
        this.loggerService.errorLog(err.msg);

        throw { msg: err.msg };
      } else {
        this.loggerService.errorLog(err);

        throw technicalErr.databaseCrash;
      }
    }
  }

  public async deleteEvent(eventId: number, id: number): Promise<void> {
    try {
      const user = await UserRoles.findOne({
        where: {
          userId: id,
          roleId: Roles.Admin
        }
      });

      if (user) {
        await EventModel.destroy({
          where: {
            id: eventId
          }
        });
        this.loggerService.infoLog(`event with id ${eventId} deleted succesfull`);
      } else {
        this.loggerService.infoLog(`user with id ${id} is not admin`);

        throw { msg: `user with id ${id} is not admin` };
      }

    } catch (err) {
      if (err.msg) {
        this.loggerService.errorLog(err.msg);

        throw { msg: err.msg };
      } else {
        this.loggerService.errorLog(err);

        throw technicalErr.databaseCrash;
      }
    }
  }

  public async editEvent(event: Event, id: number): Promise<void> {
    try {
      const user = await UserRoles.findOne({
        where: {
          userId: id,
          roleId: Roles.Admin
        }
      });

      if (user) {
        this.loggerService.infoLog(`user with id ${id} is admin`);
        await EventModel.update(
          {
            id: event.id,
            title: event.title,
            description: event.description,
            city: event.description,
            place: event.place,
            address: event.address,
            locationX: event.locationX,
            begginingInTime: event.begginingInTime,
            begginingDate: event.begginingDate
          },
          {
            where: { id: event.id }
          });

        this.loggerService.infoLog(`event with id ${event.id} edited succesfull`);
      } else {
        this.loggerService.infoLog(`user with id ${id} is not admin`);

        throw { msg: `user with id ${id} is not admin` };
      }
    } catch (err) {
      if (err.msg) {
        this.loggerService.errorLog(err.msg);

        throw { msg: err.msg };
      } else {
        this.loggerService.errorLog(err);

        throw technicalErr.databaseCrash;
      }
    }
  }

  public async getEvents(): Promise<Event[]> {
    try {
      const events = await EventModel.findAll();

      if (events) {
        this.loggerService.infoLog(` ${events.length - 1} events get succesfull`);

        return events;
      } else {
        this.loggerService.errorLog('no events yet');

        throw { msg: 'no events yet' };
      }
    } catch (err) {
      if (err.msg) {
        this.loggerService.errorLog(err.msg);

        throw { msg: err.msg };
      } else {
        this.loggerService.errorLog(err);

        throw technicalErr.databaseCrash;
      }
    }
  }

  public async getEvent(eventId: number): Promise<Event> {
    try {
      const event = await EventModel.findOne({ where: { id: eventId } });

      if (event) {
        this.loggerService.infoLog(`event ${eventId} get succesfull`);

        return event;
      } else {
        this.loggerService.errorLog('no events yet');

        throw { msg: `no event in DB with id ${eventId}` };
      }
    } catch (err) {
      if (err.msg) {
        this.loggerService.errorLog(err.msg);

        throw { msg: err.msg };
      } else {
        this.loggerService.errorLog(err);

        throw technicalErr.databaseCrash;
      }
    }
  }
}
