import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";
import { PendingQuery, Row } from "postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hasQueryParams =
    req.method === HttpMethods.GET || req.method === HttpMethods.DELETE;
  const {
    userId: user_id,
    bookId: book_id,
    quantity,
  } = hasQueryParams ? req.query : req.body;
  const requiredFields = hasQueryParams ? [] : ["userId", "bookId", "quantity"];
  const requiredParams = hasQueryParams ? ["userId"] : [];

  try {
    validateRequest(req, {
      methods: new Set([
        HttpMethods.POST,
        HttpMethods.PATCH,
        HttpMethods.DELETE,
        HttpMethods.GET,
      ]),
      requiredFields,
      requiredParams,
    });

    const dbString = (() => {
      switch (req.method) {
        case HttpMethods.POST:
          return db`INSERT INTO cart (user_id, book_id, quantity) VALUES (${user_id}, ${book_id}, ${quantity})`;
        case HttpMethods.DELETE:
          return db`DELETE FROM cart WHERE user_id = ${user_id} AND book_id = ${book_id};`;
        case HttpMethods.PATCH:
          return db`UPDATE cart SET quantity = ${quantity} WHERE user_id = ${user_id} AND book_id = ${book_id};`;
        case HttpMethods.GET:
          return db`SELECT * FROM cart WHERE user_id = ${user_id};`;
      }
    })() as PendingQuery<Row[]>;
    const items = await db`${dbString}`;
    const refinedItems = items.map((item) => ({
      id: item.book_id,
      quantity: item.quantity,
    }));

    const actionMessage = (() =>
      ({
        [HttpMethods.POST]: "added to",
        [HttpMethods.DELETE]: "removed from",
        [HttpMethods.PATCH]: "updated in",
      }[req.method as string]))();

    res.status(HttpStatus.OK).json({
      data: refinedItems,
      message: `Item ${actionMessage} cart successfully`,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
