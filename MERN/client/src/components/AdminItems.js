import React, { useState, useEffect } from "react";
import { Button,	Input, Modal } from "reactstrap";
import "../App.css";

function AdminItems(props) {

/************ STATE MANAGEMENT ************/
  //current category of admin_items
  const [category, setCategory] = useState(props.category);
  //all items of current category
  const [items, setItems] = useState([]);
  //name && price of item to add/update
  const [newItem, setNewItem] = useState( {
    name: '', 
    price: 0, 
    healthPoints: 0
  });
  //name && price of item being updated
  const [itemToChange, setItemToChange] = useState( {
    name: '', 
    price: 0, 
    healthPoints: 0
  });
  const[adminModal, setAdminModal] = useState(false);
  const calOrDesc = (category === 'specials' ? 'Description' : 'Calories');
  const labelVis = (category ? 'visible' : 'hidden');
  useEffect(() => {
    getItems();//eslint-disable-next-line
  }, []);
/************ END STATE MANAGEMENT ************/

  /************ FUNCTIONS ************/
  //Toggle modal to add item
  const toggleAdminModal = () => {
    setAdminModal(!adminModal)
  };
  //fetch all items of current category and load into state items
  const getItems = async () => {
    fetch(`http://localhost:5000/${category}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
    .catch(err => console.error(err))
  };
  //add item to current category with name && price == newItem{name, price}
  const addItem = async () => {
    await fetch(`http://localhost:5000/${category}/add?name=${newItem.name}&price=${newItem.price}&healthPoints=${newItem.healthPoints}`)
    .then(getItems)
    .then(setNewItem({name: null, price: null, healthPoints: null}))
    .catch(err => console.error(err))
  };
  //update item in current category to newItem.[name || price]
  const updateItem = async () => {
    await fetch(`http://localhost:5000/${category}/update?name=${itemToChange.name}&newName=${newItem.name}&newPrice=${newItem.price}&newHP=${newItem.healthPoints}`)
    .then(getItems)
    .catch(err => console.err(err))
  };
  const updateSpecial = async () => {
    await fetch(`http://localhost:5000/${category}/update?name=${itemToChange.name}&newName=${newItem.name}&price=${newItem.price}&hp=${newItem.healthPoints}&desc=${newItem.description}`)
    .then(getItems)
    .catch(err => console.err(err))
    console.log(`updated ${itemToChange.name} to ${newItem.name}`);
  }
  //delete item of current category with name == item.name
  const deleteItem = async (name) => {
    await fetch(`http://localhost:5000/${category}/delete?name=${name}`)
    .then(getItems)
    .then(console.log(`removed: ${name}`))
    .catch(err => console.error(err))
  };
  //set name of ItemToChange&&NewItem when input box edited
  const handleNameChange = (e) => {
    setItemToChange( {
      name: e.target.placeholder,
      price: itemToChange.price, 
      healthPoints: itemToChange.healthPoints, 
      description: itemToChange.description
    });
    setNewItem( {
      name: e.target.value,
      price: newItem.price, 
      healthPoints: newItem.healthPoints, 
      description: newItem.description
    })
  };
  //set price of ItemToChange&&NewItem when input box edited
  const handlePriceChange = (e) => {
    setItemToChange( {
      name: itemToChange.name,
     price: e.target.placeholder, 
     healthPoints: itemToChange.healthPoints, 
     description: itemToChange.description
    });
    setNewItem( {
      name: newItem.name,
      price: e.target.value, 
      healthPoints: newItem.healthPoints, 
      description: newItem.description
    });
  };
  //set healthPoints of ItemToChange && NewItem when input box edited
  const handleHealthPointsChange = (e) => {
    setItemToChange({
      name: itemToChange.name,
      price: itemToChange.price,
      healthPoints: e.target.placeholder, 
      description: itemToChange.description
    });
    setNewItem({
      name: newItem.name,
      price: newItem.price,
      healthPoints: e.target.value, 
      description:newItem.description
    })
  };
  const handleDescriptionChange = (e) => {
    setItemToChange({
			name: itemToChange.name,
			price: itemToChange.price,
			healthPoints: itemToChange.healthPoints,
			description: e.target.placeholder
    });
    setNewItem({
      name: newItem.name,
      price: newItem.price,
      healthPoints: newItem.healthPoints,
      description: e.target.value
    });
  };
  const handleCategorySelection = async (selection) => {
    await fetch(`http://localhost:5000/${selection}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
    .then(setCategory(selection))
    .then(console.log("selected"))
  }
  const handleAddClick = () => {
    addItem();
  }
  const handleUpdateClick = () => {
    if(category === 'specials') {
      updateSpecial();
    } else {
      updateItem();
    }
  }

  //render items as table of editable input boxes with buttons for updating/deleting data
  const renderItem = (item) => {
    //convert price in database to string preceded by $ and fixed to 2 decimals
    const fixedPrice ='$' + item.price.toFixed(2);

    var descriptionInput = (category === 'specials' ? 
        <Input 
          className="adminDescription" 
          onChange={handleDescriptionChange}
          defaultValue={item.description}>
        </Input> : 
        <Input
          className="adminDescription"
          onChange={(e) => console.log(e.target.value)}
          defaultValue="50kcal">
          </Input>);

    return (
			<div className='adminItemsInnerWrapper' key={item.name}>
				<div className='adminItemName'>
					<Input placeholder={item.name} onChange={handleNameChange}></Input>
				</div>

				<div className='adminItemPrice'>
					<Input placeholder={fixedPrice} onChange={handlePriceChange}></Input>
				</div>

				<div className='adminItemHP'>
					<Input
						placeholder={item.health_points}
						onChange={handleHealthPointsChange}></Input>
				</div>

				<div className='adminItemDesc'>{descriptionInput}</div>

				<div className='adminItemUpdate'>
					<Button
						block
						outline
						color='primary'
						type='button'
						onClick={handleUpdateClick}>
						Update
					</Button>
				</div>

				<div className='adminItemDelete'>
					<Button
						block
						outline
						color='danger'
						type='button'
						onClick={e => {
							deleteItem(item.name);
						}}>
						Delete
					</Button>
				</div>
			</div>
		);
  };
  /************ END FUNCTIONS ************/
  /************ HTML ELEMENTS ************/
  const addNamePlaceholder = (newItem.name ? newItem.name : 'Name');
  const addPricePlaceholder = (newItem.price ? newItem.price : 'Price');
  const addHealthPointsPlaceholder = (newItem.healthPoints ? newItem.healthPoints : 'Health Points');

    const selectCategory = (
			<div className='selectWrapper'>
				<div
					className='selectBread'
					value='bread'
					onClick={handleCategorySelection.bind(this, "bread")}>
					<span>Bread</span>
				</div>
				<div
					className='selectTortilla'
					value='tortilla'
					onClick={handleCategorySelection.bind(this, "tortilla")}>
					<span>Tortillas</span>
				</div>
				<div
					className='selectProtein'
					value='protein'
					onClick={handleCategorySelection.bind(this, "protein")}>
					<span>Protein</span>
				</div>
				<div
					className='selectCheese'
					value='cheese'
					onClick={handleCategorySelection.bind(this, "cheese")}>
					<span>Cheese</span>
				</div>
				<div
					className='selectVeggie'
					value='veggie'
					onClick={handleCategorySelection.bind(this, "veggie")}>
					<span>Veggies</span>
				</div>
				<div
					className='selectCondiment'
					value='condiment'
					onClick={handleCategorySelection.bind(this, "condiment")}>
					<span>Condiments</span>
				</div>
				<div
					className='selectExtra'
					value='extra'
					onClick={handleCategorySelection.bind(this, "extra")}>
					<span>Extras</span>
				</div>
				<div
				className='selectSpecial'
				value='specials'
				onClick={handleCategorySelection.bind(this, 'specials')}>
					<span>Specials</span>
				</div>
				<div 
				className='adminInput'
				onClick={toggleAdminModal}>
					<span>Add Ingredient</span>
				</div>
			</div>
		);
   
    /************ END HTML ELEMENTS ************/
  
    /************ DATA TO RENDER VIA COMPONENT ************/
    return (
		<div className='adminItemsWrapper'>
			<div className='adminSelectCategory'>{selectCategory}</div>

			<div className='adminTable'>
				<div style={{ visibility: labelVis }} className='adminItemHeaderName'>
					Name
				</div>
				<div
					style={{ visibility: labelVis }}
					className='adminItemHeaderPrice'>
					Price
				</div>
				<div style={{ visibility: labelVis }} className='adminItemHeaderHP'>
					HP
				</div>
				<div style={{ visibility: labelVis }} className='adminItemHeaderDesc'>
					{calOrDesc}
				</div>
				<div className='adminTableBody'>{items.map(renderItem)}</div>
			</div>

			<Modal
				className='adminModal'
				isOpen={adminModal}
				toggle={toggleAdminModal}>
				<div className='modalWrapper'>
					<div className='modalCategory'>
						<Input
							placeholder='Category'
							onChange={e => {
								setCategory(e.target.value);
							}}
						/>
					</div>
					<div className='modalName'>
						<Input
							placeholder={addNamePlaceholder}
							onChange={e =>
								setNewItem({
									name: e.target.value,
									price: newItem.price,
									healthPoints: newItem.healthPoints
								})
							}
						/>
					</div>
					<div className='modalPrice'>
						<Input
							placeholder={addPricePlaceholder}
							onChange={e =>
								setNewItem({
									name: newItem.name,
									price: e.target.value,
									healthPoints: newItem.healthPoints
								})
							}
						/>
					</div>
					<div className='modalHP'>
						<Input
							placeholder={addHealthPointsPlaceholder}
							onChange={e =>
								setNewItem({
									name: newItem.name,
									price: newItem.price,
									healthPoints: e.target.value
								})
							}
						/>
					</div>
					<div className='modalButton'>
						<Button
							block
							className='purpleButton'
							style={{ outline: "none", width: "150px" }}
							onClick={handleAddClick}>
							Submit
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default AdminItems;
