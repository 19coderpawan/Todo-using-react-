import React,{useState,useEffect} from 'react'
import './todo_style.css'

// to get the items back form the local storage.
const getItemformlocalStorage=()=>{
  const list=localStorage.getItem("todoItem");
  // if local storage is not empty then retrun the list by converting into array or object.
  if(list){
    return JSON.parse(list) ;
  }
  // else if empty return the empty array.
  else{
    return [];
  }
  
}


const Todo = () => {
  const [currinputvalue,setInputvalue]=useState("");
  // const [items,setItems]=useState([]);
  // after using localStorage
  const [items,setItems]=useState(getItemformlocalStorage());
  // state hoocks to toogle the items.
  // false means that add icon should be displayed/toogle there.
  const[toogleItem,setToogleItem]=useState(false);
  // state hooks to store the edititem id.
  const[editItemId,seteditItemId]=useState("");

  const additem=()=>{
    if(!currinputvalue){
      alert("enter the items first please!");
    }
    
    else if(currinputvalue && toogleItem){
      setItems(
        items.map((currele)=>{
         if(currele.id==editItemId){
          return {...currele,name:currinputvalue};
         }
         else{
          return currele;
         }
        })
      )
      // once the items is being updated. toogle the edit icon with the add icon agin and make input empty.
      setInputvalue("");
      setToogleItem(false);
      seteditItemId(null);

    }

    else{
     /* now include the object here to store name and id for each items seprately. */
    const newinputvalue={
      id:new Date().getTime().toString(),
      name:currinputvalue
    }

      /* here ...items(means that add all the previous elements in the items arr as well as the next currinu
        putvalue also .  here i have use the spread operators .) */
      // setItems([...items,currinputvalue]);
      setItems([...items,newinputvalue]);
      // also once you have added the items  in the array remove it form the state one.
      setInputvalue(""); 
    }
  }
// to delete particular items.
  const delete_item=(id)=>{
     const updateitem=items.filter((currele)=>{
       return currele.id !== id;
     })
     setItems(updateitem);
  }
// to delete all the list.
const delete_all=()=>{
  setItems([]);
}

// useEffect hook to add items in the local storage .
useEffect(()=>{
  // remember in localStorage the items are added in key value pairs.
  localStorage.setItem("todoItem",JSON.stringify(items));
},[items])

// to edit the items .
const editItem=(uniqueId)=>{
   const findItem=items.find((currele)=>{
    return currele.id==uniqueId;
   })
   setInputvalue(findItem.name)
  //  also store the uniqueId of the item in the editItemId state.
  seteditItemId(uniqueId);
  //  and once user clicks on the update button we are going to toogle the update icon.
  setToogleItem(true);
}

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todologo.svg" alt="todolog" />
            <figcaption>Add your list here👍</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder='add item here✍️....' 
            value={ currinputvalue }
            onChange={(event)=>setInputvalue(event.target.value)}/>
            {/* now we have to first check whether the toogle is true or not to display which btn. */}
            {toogleItem ? <i className="fa fa-edit  add-btn" onClick={()=>additem()}></i>
            :<i className="fa fa-plus fa-beat-fade add-btn" onClick={()=>additem()}></i>}
            {/* <i className="fa fa-plus fa-beat-fade add-btn" onClick={()=>additem()}></i> */}
          </div>
          {/* add items here */}
          <div className="showItems">
          {items.map((element)=>{
            return (
            // you also have to provide each child with the unique key.
              <div className="eachItem" key={element.id}>
                <h3>{element.name}</h3>
                <i className="far fa-edit  add-btn" onClick={()=>editItem(element.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=>delete_item(element.id)}></i>
              </div>
           
            ) 
          })}
            </div>  
          {/* Remove all btn */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove all" onClick={()=>delete_all()} >
              <span>Check List</span></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
/* ****************************************STEP By Step***************************************

1.now your first step is to create the state and store the input data in it so that you can later on add in list.
  1.1=> so, in order to do that you have to add two things in the input field tag one ins value={}(in
    which you are going to pass state) and the second thing is the onChange={}( it is a event which is invoked
      whenever the input field is changed.)

  1.2=>now you have created the state and able to store the currvalue of the input field in it, but the 
      problem is that when you add the new value the previous value of the state remove automatically
      so in order to store the previous value also.

     1.2.1=>I am going to create an another state which is going to hold an array which consist of all the
           value once stored in the previous state on by one.and the value is going to store in this state
           only when user click on the add icon of the input field.

2.now, once you are done with step 1 we now having all the value store in the state array.
  now the only task is to iterate through the array and display all the items in the add itmes list section.           
  
  2.1=> To, iterate simple use the map and iterate through each items and also specify the unique key there.

3.now, once you have successfully added the items in the list now lets work on the delete button.
  however in order to delete the specific items you must have somthing like unique id for each items .
  so that you can easily identify them and delete only that item.
  so our first job is to provide each items an unique id.

  3.1=>we want that when we are adding items in the array state at that time provide id to each items .
      so what you can do is in the additem method include an object with id and name properties.
      3.1.1=> for the id part use Date() method to get the time using .gettime() method and then convert
            it into an string using .toString(). (time is taken because its changes every time ).
      3.1.2=>for the name part simply use the currinputvalue state .
  
  3.2=>now once you have created the object simply add that object in the array state.then in the 
     map method to get the name simply use the '.' operator.    
  
  3.3=>now simply pass the id in the delete() method and in the updateitem variale apply filter() to 
       display only the id that are not equal to the id passed as an argrument.    
       and finally pass the updateitems in the setItems() function to update the state .

4. now once the delete button work is complete its time to move forward to the local storage.
  4.1=>so fist to do is to store the items in the local storage means when ever some this changes in
       the items state its should be reflected in the local storage also .
       One of the best way to do is to use the useEffect hook and pass the items state as an dependency
       so that if any thing is added or removed or updated in the state it should also reflect in the 
       local storage.
       4.1.1=> now to do this simply in the useEffect hook use method of localStorage.setItems().
              and pass the state in the form of string . so, you have to convert the state from the array
              to the string for that we have simply JSON method that is JSON.Stringify(items). 
              also remember that add items in the LS in the key value pairs.
    
   4.2=>so next is to do is to get the items from the local storage and what you have to do is get the 
       items form the LS in the function and pass that function in the items useState hook as an intital 
       state.so that even if you refresh the page you data doesn't lost.
       4.2.1=> so to get the data from the local storage use the method localStorage.getItems(),
             and aslo you have convert the items from string to the array again for that we have JSON.parse().           

5. now the last step is to make the edit button work.so in order to make the edit button work we have to
  do certain things that are as follows-:
    5.1=> first thing is that we have to get know the id of the items we have to edit. so in the 
         edit_Item() pass the id of the element and then the method defination use array find() method
         to find the same element as the id in the items array state.
         then once you find the item using the find() just pass that item in the setInputvalue state
         so that your items is displayed in the input field.

    5.2=> ok , so the next thing you have to do is toggle the icon from add to edit. means once the user click
         on the edit icon it should be toogle in the input field in place of add icon.To do that:-
         5.2.1=> for this we are going to create an new useState hoock to toogle the icons. 
              and by default set the initial value to false which means toogle the add icon.
              and then in the update function when user click on the edit button set the tooglebutton
              state to true.
        5.2.2=> now you have to use the ternary operator in the input field section . where the condition is
              if your tooggle state is true then toogle the edit icon and if false toogle the add icon.
    
    5.3=> now once you have successfully toogle the icons its time to work on the edit functionality.
        for that , firstly lets store the uniqueId of the items which we have to edit in the separete 
        state so that in future we can use it.
        5.3.1=>now what you have to  do is in the addItem() you have to another conditonal  statement
             that if your (currInputvalue && toogleItem) then in the else if ( as you know all the changes
              you have to make is in the setItems state so in the setItem() state iterate through the
              items state and find the items.id ===upaterItemid  once finded return all  the other 
              items as it is and update the name of the curritem with the currInputvalue. ) 
        5.3.2=> and in the end simply make the setToogleItem(false) to toogle back the add icon and 
               also make the setInputvalue("") empty to make the input field back to original and aslo
               make the updateItem(null) to make it empty agian.
               
          /* ---------------------------------------END----------------------------------------------- */     

