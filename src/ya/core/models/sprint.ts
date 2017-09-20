import { Story } from './story';

export class Meeting {

    day = 0;
    status = Sprint.STATUS_CLOSED;

}



export class Sprint {

    public static STATUS_CLOSED = 'closed';
    public static STATUS_OPEN = 'open';
    public static STATUS_NEW = 'new';
    public static STATUS_STARTED = 'started';

    public static FILTER_PROGRESS = 'progress';
    public static FILTER_PENDING = 'pending';


    $key: string;
    code: string;
    name: string;
    status: string;

    startDate: Date;
    endDate: Date;
    duration = 15;
    meeting: Meeting = new Meeting();

    estimate = 0;
    progress = 0;
    remaining = 0;

    velocity: number;

    conversationId: string;
    scrumMasterId: string;

    background: string;
    thumbnail: string;
    storyNumber = 0;

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
        if (Sprint.STATUS_NEW === status) {
            return Sprint.FILTER_PROGRESS;
        }
        if (Sprint.STATUS_NEW === status || undefined === status) {
            return Sprint.FILTER_PENDING;
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

        return Math.round((progress / sprint.estimate) * 100);

    }

    public static updateProgress(sprint: Sprint, stories: Story[]) {
        if (sprint) {
            sprint.progress = 0;
            sprint.estimate = 0;
            sprint.progress = 0;
            if (stories && stories.length > 0) {
                stories.forEach(story => {
                    sprint.estimate += story.estimate;
                    const progress = Story.getLatestProgress(story);
                    if (progress) {
                        sprint.progress += progress.total;
                        sprint.remaining += progress.remaining;
                    }
                });
            }
        }
    }


}