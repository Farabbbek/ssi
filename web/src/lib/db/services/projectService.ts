import { prisma } from '../prisma';

export const projectService = {
  async getProject(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        created_by: {
          select: { id: true, username: true, email: true }
        },
        _count: {
          select: { members: true, branches: true, pull_requests: true }
        }
      }
    });
  },

  async getAllProjects(skip = 0, take = 10) {
    return prisma.project.findMany({
      skip,
      take,
      include: {
        _count: {
          select: { members: true, branches: true }
        }
      }
    });
  },

  async getUserProjects(userId: string, skip = 0, take = 10) {
    return prisma.project.findMany({
      where: {
        OR: [
          { created_by_id: userId },
          { members: { some: { user_id: userId } } }
        ]
      },
      skip,
      take,
      include: {
        created_by: {
          select: { id: true, username: true }
        },
        _count: {
          select: { members: true, branches: true }
        }
      }
    });
  },

  async createProject(data: {
    name: string;
    description?: string;
    repo_path: string;
    is_private?: boolean;
    created_by_id: string;
  }) {
    return prisma.project.create({
      data: {
        ...data,
        is_private: data.is_private ?? false
      },
      include: {
        created_by: {
          select: { id: true, username: true }
        }
      }
    });
  },

  async updateProject(
    id: string,
    data: { name?: string; description?: string; is_private?: boolean }
  ) {
    return prisma.project.update({
      where: { id },
      data,
      include: {
        created_by: {
          select: { id: true, username: true }
        }
      }
    });
  },

  async deleteProject(id: string) {
    return prisma.project.delete({
      where: { id }
    });
  },

  async getProjectMembers(projectId: string) {
    return prisma.projectMember.findMany({
      where: { project_id: projectId },
      include: {
        user: {
          select: { id: true, username: true, email: true }
        }
      }
    });
  },

  async addProjectMember(
    projectId: string,
    userId: string,
    role: 'ADMIN' | 'DEVELOPER'
  ) {
    return prisma.projectMember.create({
      data: {
        project_id: projectId,
        user_id: userId,
        role
      },
      include: {
        user: {
          select: { id: true, username: true }
        }
      }
    });
  }
};
