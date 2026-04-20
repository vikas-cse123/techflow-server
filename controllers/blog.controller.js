import { success } from "zod";
import Session from "../models/session.model.js";
import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import Tag from "../models/tag.model.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, tags = [] } = req.body;

    const normalizedTags = tags.map(tag => tag.toLowerCase().trim());

    let tagsId = [];

    if (normalizedTags.length > 0) {
      await Tag.bulkWrite(
        normalizedTags.map(tag => ({
          updateOne: {
            filter: { name: tag },
            update: { $setOnInsert: { name: tag } },
            upsert: true,
          },
        }))
      );

      const tagDocs = await Tag.find({
        name: { $in: normalizedTags }
      }).select("_id");

      tagsId = tagDocs.map(tag => tag._id);
    }

    const blog = await Blog.create({
      authorId: req.user.id,
      title,
      content,
      tags: tagsId,
    });

    return res.status(201).json({
      success: true,
      message: "Blog published successfully",
      data: { id: blog._id },
    });

  } catch (error) {
    next(error);
  }
};
