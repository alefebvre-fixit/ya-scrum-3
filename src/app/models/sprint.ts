import { Story } from './story';
import { SprintProgress } from './progress';

export class Sprint {

    $key: string;
    code: string;
    name: string;
    status: string;
    description: string;

    startDate: Date;
    endDate: Date;
    duration: number;
    size: number = 0;

    capacity: number;

    conversationId: string;
    scrumMasterId: string;

    progress: number;

    impediment: Story;

    //Index for query
    //http://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
    filter_status: string;

    history: SprintProgress[];

    public static getUpdate(sprint: any): any {

        const result = Object.assign({}, sprint);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

    public static create(): Sprint {
        let result: Sprint = new Sprint();

        result.duration = 15;
        result.startDate = new Date();
        result.endDate = new Date(result.startDate);
        result.startDate.setDate(result.startDate.getDate() + result.duration);

        return result;

    }

    public static getProgress(sprint: Sprint, day: number): SprintProgress {
        if (sprint.history) {
            for (let progress of sprint.history) {
                if (progress.day == day) {
                    return progress;
                }
            }
        }
        return undefined;
    }

    public static createProgress(sprint: Sprint, day: number): SprintProgress {

        let result = new SprintProgress();

        result.sprintId = sprint.$key;
        result.day = day;
        result.date = new Date();
        result.previous = 0;
        result.daily = 0;
        result.total = 0;
        result.remaining = 0;

        return result;

    }

    public static setProgress(sprint: Sprint, progress: SprintProgress) {

        if (sprint.history == undefined) {
            sprint.history = new Array<SprintProgress>();
        }

        if (progress.day > 0) {
        //if (progress.day > 0 && progress.day <= sprint.history.length) {
            sprint.history[progress.day - 1] = progress;
        }

    }

    public static getFilterStatus(status: string): string {
        if ("started" == status) {
            return "progress";
        }
        if ("new" == status || undefined == status) {
            return "pending";
        } 
        return status;
    }


}