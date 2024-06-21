import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import { ContactMutation, contactsDB } from "./db/db";

const wait = async (timeout: number = 0) =>
	await new Promise((resolve) => setTimeout(resolve, timeout));

export async function getContacts(query?: string | null) {
	await wait(500);
	let contacts = await contactsDB.getAll();
	if (query) {
		contacts = matchSorter(contacts, query, {
			keys: ["first", "last"],
		});
	}
	return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
	const contact = await contactsDB.create({});
	return contact;
}

export async function getContact(id: string) {
	return contactsDB.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
	await wait(500);
	const contact = await contactsDB.get(id);
	if (!contact) {
		throw new Error(`No contact found for ${id}`);
	}
	await contactsDB.set(id, { ...contact, ...updates });
	return contact;
}

export async function deleteContact(id: string) {
	contactsDB.delete(id);
}
