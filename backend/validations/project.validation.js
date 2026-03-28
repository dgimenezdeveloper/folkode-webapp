import { z } from "zod";

const allowedCategories = [
  "ECOMMERCE",
  "LANDING_PAGE",
  "CORPORATIVO",
  "MULTIMEDIA",
  "WEB",
  "SOFTWARE",
];

const allowedStatuses = [
  "IN_DEVELOPMENT",
  "COMPLETED",
  "MAINTENANCE",
  "PAUSED",
];

export const projectIdParamSchema = z.object({
  id: z.string().min(1, "El id es requerido"),
});

export const projectsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  status: z.enum(allowedStatuses).optional(),
  category: z.enum(allowedCategories).optional(),
  search: z.string().trim().min(1).optional(),
});

export const projectCreateSchema = z.object({
  title: z.string().trim().min(1, "title es requerido"),
  slug: z.string().trim().min(1, "slug es requerido"),
  description: z.string().trim().min(1, "description es requerido"),
  shortDesc: z.string().trim().optional().nullable(),
  category: z.enum(allowedCategories, { message: "category inválido" }),
  status: z.enum(allowedStatuses, { message: "status inválido" }),
  featured: z.boolean().optional(),

  clientId: z.string().optional().nullable(),

  demoUrl: z.string().url("demoUrl debe ser URL válida").optional().nullable(),
  liveUrl: z.string().url("liveUrl debe ser URL válida").optional().nullable(),
  githubUrl: z.string().url("githubUrl debe ser URL válida").optional().nullable(),

  technologies: z.any().optional(),

  images: z.array(z.object({
    url: z.string().url("images.url debe ser URL válida"),
    alt: z.string().optional(),
    order: z.number().int().optional(),
  })).optional(),

  sections: z.array(z.object({
    key: z.string().optional(),
    title: z.string().trim().min(1, "sections.title es requerido"),
    description: z.string().optional(),
    order: z.number().int().optional(),
    images: z.any().optional(),
  })).optional(),
});

export const projectUpdateSchema = projectCreateSchema;