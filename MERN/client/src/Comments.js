import React from "react";
import { Input } from "reactstrap";
import ItemHeader from "./ItemHeader";

function Comments() {
	return (
		<div>
			<ItemHeader title='Comments' />
			<Input
				type='textarea'
				placeholder='Special instructions for the kitchen...'
			/>
		</div>
	);
}

export default Comments;
