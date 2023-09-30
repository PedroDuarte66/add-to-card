import { initializeApp} 
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } 
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-de8bd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById('shopping-list')

inputFieldEl.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      addButtonEl.click()
    }
  });

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
 
    clearField(inputFieldEl)

    // appendItemToShoppingListEL(inputValue)  we cancel thisone because it repeats itself
})


onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val()) // values was change for entries to allow the key to be in

        clearShoppingListEl()
        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
    
    
            let currentItemID = currentItem[0]
            
            let currentItemValue = currentItem[1]
          
           appendItemToShoppingListEL(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = 'No items here...yet'
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''
}

function clearField(field) {
    field.value = ''
    field.placeholder = ''
}

function appendItemToShoppingListEL (item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')

    newEl.textContent = itemValue

    newEl.addEventListener('click', function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)

}


//the following function is an example to find the index of an element.

// const arr = [["-NMV2WNiQDMkVmqKp8е6", "Oranges"], ["-NMV6Y7xiFC6psy7CPTQ", "Chocolate"], ["-NMV6wtqavmVYCFMKYSf", "Red bull"], ["-NMe9Rx8I7LSiElb_XHT", "Bread"], ["-NMixkfE_xifAzm2xUOR", "Coffee"], ["-NMixy0pVQspZHyUVFaL", "Solo"]];
// const elementToFind = "Bread";
// const index = arr.findIndex((element) => element.includes(elementToFind));

// console.log(index); // Output: 3
