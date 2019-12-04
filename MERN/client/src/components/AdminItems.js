import React, { useState } from "react";
import { Modal } from "reactstrap";
import { FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';
import "../App.css";

function AdminItems() {


  const [category, setCategory] = useState();
  const [items, setItems] = useState([]);
  const[addModalOpen, setAddModalOpen] = useState(false);
  const[editModalOpen, setEditModalOpen] = useState(false);
  const[newDescription, setNewDescription] = useState();
  const[newName, setNewName] = useState();
  const[newPrice, setNewPrice] = useState();
  const[newHP, setNewHP] = useState();
  const[newCals, setNewCals] = useState();
  const[itemToChange, setItemToChange] = useState({
	  name: '',
	  price: '',
	  healthPoints: ''
  });
  const[newItem, setNewItem] = useState({
	  name: '',
	  price: '',
	  healthPoints: ''
  });



  const toggleAddModalOpen = () => {
    setAddModalOpen(!addModalOpen);
  };

  const toggleEditModalOpen = () => {
	  setEditModalOpen(!editModalOpen);
  };
  
  const getItems = () => {
	fetch(`http://localhost:5000/${category}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
    .catch(err => console.error(err))
  };
  
  const addItem = async () => {

	category === 'special' ||'specials' ? setCategory('main') : setCategory(category);

	(newDescription ? (await fetch(`http://localhost:5000/${category}/add?name=${newName}&desc='${newDescription}'&price=${newPrice}&healthPoints=${newHP}&newCals=${newCals}`)
		.then(getItems)
		.then(toggleAddModalOpen)
		.then(setCategory(category))
		.then(setNewName(null))
		.then(setNewPrice(null))
		.then(setNewHP(null))
		.then(setNewCals(null))
		.catch(err => console.error(err))
		) : (await fetch(`http://localhost:5000/${category}/add?name=${newName}&price=${newPrice}&healthPoints=${newHP}&newCals=${newCals}`)
		.then(getItems)
		.then(toggleAddModalOpen)
		.then(setCategory(category))
		.then(setNewName(null))
		.then(setNewPrice(null))
		.then(setNewHP(null))
		.then(setNewCals(null))
		.catch(err => console.error(err))))
  }
 
  const updateItem = async () => {
    await fetch(`http://localhost:5000/${category}/update?name=${itemToChange.name}&newName=${newItem.name}&newPrice=${newItem.price}&newHP=${newItem.healthPoints}&newCals=${newCals}`)
    .then(getItems)
	.catch(err => console.err(err))
	
  };

  const updateSpecial = async () => {
    await fetch(`http://localhost:5000/${category}/update?name=${itemToChange.name}&newName=${newName}&price=${newPrice}&hp=${newHP}&desc=${newDescription}&newCals=${newCals}`)
	.then(getItems)
	.then(setItemToChange(null))
	.then(setNewItem(null))
    .catch(err => console.err(err))
    console.log(`updated ${itemToChange.name} to ${newItem.name}`);
  }

  const handleCategorySelection = async (selection) => {
    await fetch(`http://localhost:5000/${selection}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
	.then(setCategory(selection))
	.catch(err => console.log(err))
  }
	const handleDeleteClick = async item => {
	await fetch(`http://localhost:5000/${category}/delete?name=${item}`)
	.then(getItems)
	.then(console.log(`removed: ${item}`))
	.catch(err => console.error(err));
	};

	const handleAddClick = () => {
	addItem();
	}
  const handleUpdateClick = () => {
    if(category === 'specials' || 'special') {
      updateSpecial();
    } else {
      updateItem();
    }
  }
  const addDescriptionVis = category === 'specials' ? {display:'inline'} : {display:'none'};

  //render items as table of editable input boxes with buttons for updating/deleting data
  const renderItem = (item) => {
   
	const handleNameChange = (e) => {
		setItemToChange({ name: item.name, price: item.price, healthPoints: item.health_points });
		setNewItem({ name: e.target.value, price: newItem.price, healthPoints: newItem.healthPoints });
	};
	const handlePriceChange = (e) => {
		setItemToChange({ name: item.name, price: item.price, healthPoints: item.health_points });
		setNewItem({ name: newItem.name, price: e.target.value, healthPoints: newItem.healthPoints });
	}
	const handleHealthPointsChange = (e) => {
		setItemToChange({ name: item.name, price: item.price, healthPoints: item.health_points });
		setNewItem({ name: newItem.name,price: newItem.price, healthPoints: e.target.value });
	}
	const handleDescriptionChange = (e) => {
		setNewDescription(e.target.value);
	}


	
	var description = item.description ? item.description : null;
	var descriptionVis = item.description ? 'inline' : 'none';

    return (
			<div className='adminItemsContainer' key={item.name}>
				<div className='adminItemInfo'>
					<input className="adminItemName" placeholder={item.name} onChange={handleNameChange}></input>
					<input
						placeholder={`$${item.price.toFixed(2)}`}
						onChange={handlePriceChange}></input>
					<span>{item.health_points} cal.</span>
					<input
						placeholder={`Health Points: ${item.health_points}`}
						onChange={handleHealthPointsChange}
					/>
				</div>

				<textarea
					style={{ display: `${descriptionVis}`}}
					className='adminItemDescription'
					defaultValue={description}
					onChange={handleDescriptionChange}>
				</textarea>

				<div className='adminButtons'>
					<button type='button' onClick={toggleEditModalOpen}>
						<FaEdit size={20}/>
					</button>
					<button type='button' onClick={handleDeleteClick.bind(this, `${item.name}`)}>
						<FaTrash size={20}/>
					</button>
				</div>

				<Modal
					style={{ background: "transparent" }}
					isOpen={editModalOpen}
					toggle={toggleEditModalOpen}>
					<div className='editModalWrapper'>
						<div className='editModalHeader'>
							<h5>Review changes before submitting...</h5>
						</div>
						<div className='editModalBody'>
							<ul>
								<li>{itemToChange.name}</li>
								<li>{itemToChange.price}</li>
								<li>{itemToChange.healthPoints}</li>
							</ul>

							<FaArrowRight size={48}/>

							<ul>
								<li>{newItem.name}</li>
								<li>{newItem.price}</li>
								<li>{newItem.healthPoints}</li>
							</ul>

						</div>

						<span style={{ visibility: `${descriptionVis}` }}>{`"${newDescription}"`}</span>
						<button onClick={handleUpdateClick}>Submit Changes</button>
					</div>
				</Modal>
			</div>
		);
  };
 

    const selectCategory = (
			<div className='selectWrapper'>
				<div
					value='bread'
					onClick={handleCategorySelection.bind(this, "bread")}>
					<span>Bread</span>
				</div>
				<div
					value='tortilla'
					onClick={handleCategorySelection.bind(this, "tortilla")}>
					<span>Tortillas</span>
				</div>
				<div
					value='protein'
					onClick={handleCategorySelection.bind(this, "protein")}>
					<span>Protein</span>
				</div>
				<div
					value='cheese'
					onClick={handleCategorySelection.bind(this, "cheese")}>
					<span>Cheese</span>
				</div>
				<div
					value='veggie'
					onClick={handleCategorySelection.bind(this, "veggie")}>
					<span>Veggies</span>
				</div>
				<div
					value='condiment'
					onClick={handleCategorySelection.bind(this, "condiment")}>
					<span>Condiments</span>
				</div>
				<div
					value='extra'
					onClick={handleCategorySelection.bind(this, "extra")}>
					<span>Extras</span>
				</div>
				<div
					value='specials'
					onClick={handleCategorySelection.bind(this, 'specials')}>
					<span>Specials</span>
				</div>
				<div 
					onClick={toggleAddModalOpen}>
					<span>Add Ingredient</span>
				</div>

			</div>
		);
   
    
  
    return (
		<div className='adminItemsWrapper'>
			<div className='adminSelectCategory'>{selectCategory}</div>

			<div className='adminTable'>{items.map(renderItem)}</div>

			<Modal
				isOpen={addModalOpen}
				toggle={toggleAddModalOpen}>
				<div className='addModalWrapper'>
						<input placeholder='Category' onChange={e => setCategory(e.target.value)} />
						<input placeholder='Name' onChange={e => setNewName(e.target.value)} />
						<input placeholder='Price' onChange={e => setNewPrice(e.target.value)} />
						<input placeholder='Health Points' onChange={e => setNewHP(e.target.value)} />
						<input placeholder='Calories' onChange={e => setNewCals(e.target.value)} />
						<input placeholder='Description' onChange={e => setNewDescription(e.target.value)}
								style={addDescriptionVis}
						/>
						<button block className='purpleButton' onClick={handleAddClick}>Add Item</button>
				</div>

			</Modal>
		</div>
	);
}

export default AdminItems;
