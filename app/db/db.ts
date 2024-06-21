import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

export type ContactMutation = {
	id?: string;
	first?: string;
	last?: string;
	avatar?: string;
	email?: string;
	notes?: string;
	favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
	id: string;
	createdAt: string;
};

export const contactsDB = {
	records: {} as Record<string, ContactRecord>,

	async getAll(): Promise<ContactRecord[]> {
		return Object.keys(contactsDB.records)
			.map((key) => contactsDB.records[key])
			.sort(sortBy("-createdAt", "last"));
	},

	async get(id: string): Promise<ContactRecord | null> {
		return contactsDB.records[id] || null;
	},

	async create(values: ContactMutation): Promise<ContactRecord> {
		const id = values.id || Math.random().toString(36).substring(2, 9);
		const createdAt = new Date().toISOString();
		const newContact = { id, createdAt, ...values };
		contactsDB.records[id] = newContact;
		return newContact;
	},

	async set(id: string, values: ContactMutation): Promise<ContactRecord> {
		const contact = await contactsDB.get(id);
		invariant(contact, `No contact found for ${id}`);
		const updatedContact = { ...contact, ...values };
		contactsDB.records[id] = updatedContact;
		return updatedContact;
	},

	delete(id: string): null {
		delete contactsDB.records[id];
		return null;
	},
};

[
	{
		avatar: "/kitten.png",
		first: "Gustavo",
		last: "Monjardim",
		email: "gustavo.monjardim@br.ebury.com",
	},
	{
		avatar: "/kitten.png",
		first: "Alan",
		last: "Cesar",
		email: "alan.elias@br.ebury.com",
	},
	{
		avatar: "/kitten.png",
		first: "Everton",
		last: "Costa",
		email: "everton.costa@br.ebury.com",
	},
	{
		avatar: "/kitten.png",
		first: "Anderson",
		last: "Ferreira",
		email: "anderson.ferreira@br.ebury.com",
	},
	{
		avatar: "/kitten.png",
		first: "Isaac",
		last: "Marques",
		email: "isaac.marques@br.ebury.com",
	},
	{
		avatar: "/kitten.png",
		first: "Marcelo",
		last: "Atanásio",
		email: "marcelo.atanasio@br.ebury.com",
	},
	{
		avatar: "/kitten.png",
		first: "Rafael",
		last: "Sousa",
		email: "radael.sousa@br.ebury.com",
	},
].forEach((contact) => {
	contactsDB.create({
		...contact,
		id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
	});
});
