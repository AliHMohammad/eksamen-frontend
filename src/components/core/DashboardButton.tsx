import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Props<T> = {
	text: string;
	children: ReactNode;
	linkTo: string;
	state?: T
}

export default function DashboardButton<T>({ text, children, linkTo, state }: Props<T>) {
	return (
		<Link to={linkTo} state={state} >
			<article className="h-32 sm:h-48  w-fit flex flex-col justify-between items-center group">
				{children}
				<Button className="font-semibold hover:bg-orange-300 text-xl scale-75 sm:scale-100">{text}</Button>
			</article>
		</Link>
	);
}