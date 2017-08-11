import { Story } from './story';

export class Sprint {

    $key: string;
    code: string;
    name: string;
    status: string;
    description: string;

    startDate: Date;
    endDate: Date;
    duration = 15;

    estimate = 0;
    progress = 0;
    remaining = 0;

    velocity: number;

    conversationId: string;
    scrumMasterId: string;

    meetingNumber = 0;

    impediment: Story;

    //Index for query
    //http://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
    filter_status: string;

    public static getUpdate(sprint: any): any {

        const result = Object.assign({}, sprint);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static create(): Sprint {
        const result: Sprint = new Sprint();

        result.duration = 15;
        result.startDate = new Date();
        result.endDate = new Date(result.startDate);
        result.startDate.setDate(result.startDate.getDate() + result.duration);

        return result;

    }

    public static getFilterStatus(status: string): string {
        if ('started' === status) {
            return 'progress';
        }
        if ('new' === status || undefined === status) {
            return 'pending';
        }
        return status;
    }

    public static progressAsPercentage(sprint: Sprint): number {
        let progress = 0;

        if (sprint === undefined) {
            return 0;
        }

        if (sprint.estimate <= 0) {
            return 0;
        }

        if (sprint.progress !== undefined) {
            progress = sprint.progress;
        }

        return (progress / sprint.estimate) * 100;

    }

}