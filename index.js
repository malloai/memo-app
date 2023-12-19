import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-1ad2a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = {
        text: inputFieldEl.value,
        switch: false
    }
    
    if (inputValue.text !== "") {
        push(shoppingListInDB, inputValue)
    
        clearInputFieldEl()
    }
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "Aucune tâche pour le moment"
    }

})

let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}/switch`)
        if (exactLocationOfItemInDB) {
            newEl.setAttribute("id", "zero")
        } else {
            newEl.setAttribute("id", "clicked")
        }

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1].text
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    //CHANGE TO MAKE

    newEl.addEventListener("click", () => {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}/switch`)
        remove(exactLocationOfItemInDB)

        if (exactLocationOfItemInDB) {
            newEl.setAttribute("id", "clicked")
        }
    })
 
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

