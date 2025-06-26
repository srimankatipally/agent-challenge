// import { createTool } from "@mastra/core/tools";
// import { z } from "zod";

// // Simple async function that conforms to input and output schema
// const getInfo = async (ctx: string) =>
//   Promise.resolve({ bar: ctx.length, baz: "baz" });

// // Define your tool using the `createtool`
// export const yourTool = createTool({
//   id: "tool-name",
//   description: "Use the `createTool function to create your tool",
//   inputSchema: z.object({
//     foo: z.string().describe("Foo name"),
//   }),
//   outputSchema: z.object({
//     bar: z.number(),
//     baz: z.string(),
//   }),
//   execute: async ({ context }) => {
//     return await getInfo(context.foo);
//   },
// });
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const calculatorTool = createTool({
	id: "calculate",
	description: "Evaluate a math expression and return the result.",
	inputSchema: z.object({
		expression: z.string().describe("Mathematical expression to evaluate"),
	}),
	outputSchema: z.object({
		result: z.number(),
	}),
	execute: async ({ context }) => {
		try {
			const value = Function(`"use strict"; return (${context.expression})`)();
			if (typeof value !== "number" || Number.isNaN(value)) {
				throw new Error("Expression did not evaluate to a number");
			}
			return { result: value };
		} catch (err) {
			throw new Error(`Failed to evaluate expression: ${err}`);
		}
	},
});