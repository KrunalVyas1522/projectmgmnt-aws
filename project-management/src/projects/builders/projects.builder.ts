import { CreateProjectDto } from "../dto/create-project.dto";
import { ProjectsModel } from "../entities/project.model";

export class ProjectsBuilder {
    static async buildProject(project: CreateProjectDto): Promise<ProjectsModel> {
        // Check for required fields
        if (!project.title || !project.description) {
            throw new Error("Invalid project data: title and description are required.");
        }

        // Create and return the ProjectsModel
        return new ProjectsModel(
            project.title,
            project.description,
            new Date(),
            new Date()
        );
    }
}
