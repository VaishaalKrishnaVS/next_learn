"use server";
import { auth } from "@/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { db } from "@/db";
import { redirect, RedirectType } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message:
        "Topic name must be lowercase and contain only letters and hyphens.",
    }),
  description: z.string().min(10),
});

interface CreateTopicState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
export async function createTopic(
  formState: CreateTopicState,
  form: FormData
): Promise<CreateTopicState> {
  const result = createTopicSchema.safeParse({
    name: form.get("name"),
    description: form.get("description"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user)
    return {
      errors: {
        _form: ["You must be signed in to create a topic."],
      },
    };

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong."],
        },
      };
    }
  }
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
