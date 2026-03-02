import { pgTable, serial, varchar, integer, numeric } from "drizzle-orm/pg-core";


export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length : 255 }).notNull(),
    amount: numeric('amount', { length : 255 }).notNull(),
    icon: varchar('icon').notNull(),
    createdBy: varchar('created_by').notNull(),
})

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),  
    amount: numeric('amount').notNull().default(0),  
    budgetId: integer('budget_id').references(() => Budgets.id),
    createdAt: varchar('createdAt').notNull(),
})