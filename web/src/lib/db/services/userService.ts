import { prisma } from '../prisma';
import { UserRole } from '@prisma/client';

export const userService = {
  async getUser(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      }
    });
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  async getAllUsers(skip = 0, take = 10) {
    return prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      }
    });
  },

  async createUser(data: {
    username: string;
    email: string;
    password_hash: string;
    role: UserRole;
  }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      }
    });
  },

  async updateUser(
    id: string,
    data: { username?: string; email?: string; role?: UserRole }
  ) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        updated_at: true
      }
    });
  },

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id }
    });
  },

  async getUserProjects(userId: string) {
    return prisma.project.findMany({
      where: {
        OR: [
          { created_by_id: userId },
          { members: { some: { user_id: userId } } }
        ]
      },
      include: {
        _count: {
          select: { members: true, branches: true }
        }
      }
    });
  }
};
