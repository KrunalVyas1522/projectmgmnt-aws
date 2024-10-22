import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsModel } from "../entities/project.model";

export interface IProjectRepository {
    saveProject(project: ProjectsModel): Promise<ProjectsModel>;
    getAllProjects(query: string): Promise<ProjectsModel[]>;
}

@Injectable()
export class ProjectRepository implements IProjectRepository{
    
    constructor(
        @InjectRepository(ProjectsModel)
        private readonly ProjectRepository: Repository<ProjectsModel>
    ){}

    public async saveProject(project: ProjectsModel): Promise<ProjectsModel> {
        return await this.ProjectRepository.save(project);
    }

    public async getAllProjects(query: any): Promise<ProjectsModel[]> {
        let queryable = await this.ProjectRepository.createQueryBuilder('projects');
    
        // Check if the query is not empty
        if (query) {
            // Searching for title using ILIKE
            queryable = queryable.where('projects.title ILIKE :project', {
                project: `%${query?.query}%`,
            });
    
            // Additionally searching within translations
            queryable = queryable.orWhere('projects.content::text ILIKE :content', {
                content: `%${query.query}%`
            });

            console.log('CurrentQuery : ======> ', queryable.getQueryAndParameters());
        }
    
        return await queryable.getMany();
    }
}