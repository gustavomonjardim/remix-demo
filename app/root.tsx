import { LinksFunction } from "@remix-run/node";
import {
	Form,
	Links,
	Meta,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: appStylesHref },
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div id="sidebar">
					<h1>My Notes</h1>
					<div>
						<Form id="search-form" role="search">
							<input
								id="q"
								aria-label="Search contacts"
								placeholder="Search"
								type="search"
								name="q"
							/>
							<div id="search-spinner" aria-hidden hidden={true} />
						</Form>
						<Form method="post">
							<button type="submit">New</button>
						</Form>
					</div>
					<nav>
						<ul>
							<li>
								<a href={`/notes/1`}>Anotação 1</a>
							</li>
							<li>
								<a href={`/notes/2`}>Anotação 2</a>
							</li>
						</ul>
					</nav>
				</div>

				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
