const portionsDefaultValue = 1
const quantityMeasure = [
	"g",
	"kg",
	"ml",
	"l",
	"Tbsp",
	"Tsp"
]

var recepie
var ingredientsCount = 0

var portionsOldValue = portionsDefaultValue

window.onload = () => {
	recepie = document.querySelector("#ingredients")
	let addIngredientButton = document.querySelector("#btn-recepie-add")
	addIngredientButton.onclick = () => {
		addIngredient()
	}

	let portionsInput = document.querySelector("#portionsInput")
	portionsInput.value = portionsDefaultValue
	portionsInput.oninput = () => {
		if(portionsInput.value <= 0) {
			return
		}
		let quantities = document.getElementsByClassName("quantity")
		for(let i = 0; i < quantities.length; i++) {
			let a = quantities[i].value
			let b = portionsOldValue
			let d = portionsInput.value

			let c = (a*d) / b

			quantities[i].value = c
		}
		portionsOldValue = portionsInput.value
	}

	let saveRecepieButton = document.querySelector("#btn-download-recepie")
	saveRecepieButton.onclick = () => {
		saveRecepieAsImage()
	}

	addIngredient()
}


function saveRecepieAsImage() {
	let recepieTitleInput = document.querySelector("#recepieTitleInput")
	let recepieName = "recepie"
	if(recepieTitleInput && recepieTitleInput.value) {
		recepieName = recepieTitleInput.value
	}

	// Hide all buttons
	let buttons = document.getElementsByTagName("button")
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].style.display = "none"
	}

	html2canvas(document.querySelector("#recepie")).then(canvas => {
		//document.body.appendChild(canvas)

		// Show all buttons
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].style.display = "inline-block"
		}

		let img = canvas.toDataURL("image/png")
		let downloadButton = document.createElement("a")
		downloadButton.download = recepieName + ".png"
		downloadButton.href = img
		downloadButton.click()
	})
}

function addIngredient() {
	if(recepie == null) {
		console.log("Recepie node not found!")
		return
	}

	// Create ingredient div
	let ingredientDiv = document.createElement("div")
	ingredientDiv.classList.add("ingredient", "mt-2")
	ingredientDiv.id = "ingredient_" + ingredientsCount

	// Create delete button
	let delDiv = document.createElement("div")
	delDiv.classList.add("col-12", "text-end")

	let delButton = document.createElement("button")
	delButton.classList.add("circle-icon-button-red", "mb-0")
	delButton.type = "button"
	delButton.onclick = () => { removeIngredient(ingredientDiv.id) }

	let delButtonIcon = document.createElement("i")
	delButtonIcon.classList.add("iconoir-xmark-circle-solid")

	delButton.appendChild(delButtonIcon)
	delDiv.appendChild(delButton)

	ingredientDiv.appendChild(delDiv)

	// Create ingredient name input
	let ingredientNameDiv = document.createElement("div")
	ingredientNameDiv.classList.add("form-floating", "mb-2")

	let ingredientNameInput = document.createElement("input")
	ingredientNameInput.classList.add("form-control", "ingredient-name")
	ingredientNameInput.setAttribute("list", "ingredients-list")
	ingredientNameInput.type = "text"
	ingredientNameInput.placeholder = "Ingrediente"
	ingredientNameInput.id = ingredientDiv.id + "_name"

	let ingredientNameLabel = document.createElement("label")
	ingredientNameLabel.setAttribute("for", ingredientNameInput.id)
	ingredientNameLabel.textContent = "Ingrediente"

	ingredientNameDiv.appendChild(ingredientNameInput)
	ingredientNameDiv.appendChild(ingredientNameLabel)

	ingredientDiv.appendChild(ingredientNameDiv)

	// Create ingredient quantity row
	let quantityDivRow = document.createElement("div")
	quantityDivRow.classList.add("row")

	// Quantity input
	let quantityColDiv = document.createElement("div")
	quantityColDiv.classList.add("col-6")

	let quantityDiv = document.createElement("div")
	quantityDiv.classList.add("form-floating")

	let quantityInput = document.createElement("input")
	quantityInput.classList.add("form-control", "quantity")
	quantityInput.type = "number"
	quantityInput.placeholder = "Quantità"
	quantityInput.id = ingredientDiv.id + "_quantity"

	let quantityInputLabel = document.createElement("label")
	quantityInputLabel.setAttribute("for", quantityInput.id)
	quantityInputLabel.textContent = "Quantità"

	quantityDiv.appendChild(quantityInput)
	quantityDiv.appendChild(quantityInputLabel)

	quantityColDiv.appendChild(quantityDiv)

	quantityDivRow.appendChild(quantityColDiv)

	// Quantity measure
	let quantityMeasureColDiv = document.createElement("div")
	quantityMeasureColDiv.classList.add("col-6")

	let quantityMeasureDiv = document.createElement("div")
	quantityMeasureDiv.classList.add("form-floating")

	let quantityMeasureSelectInput = document.createElement("select")
	quantityMeasureSelectInput.classList.add("form-select")
	quantityMeasureSelectInput.id = ingredientDiv.id + "_measure"

	for(let measure of quantityMeasure) {
		let option = document.createElement("option")
		option.value = measure
		option.textContent = measure
		quantityMeasureSelectInput.appendChild(option)
	}

	quantityMeasureSelectLabel = document.createElement("label")
	quantityMeasureSelectLabel.setAttribute("for", quantityMeasureSelectInput.id)
	quantityMeasureSelectLabel.textContent = "Misura"

	quantityMeasureDiv.appendChild(quantityMeasureSelectInput)
	quantityMeasureDiv.appendChild(quantityMeasureSelectLabel)

	quantityMeasureColDiv.appendChild(quantityMeasureDiv)

	quantityDivRow.appendChild(quantityMeasureColDiv)

	ingredientDiv.appendChild(quantityDivRow)

	recepie.appendChild(ingredientDiv)

	ingredientsCount++
}

function removeIngredient(id) {
	document.getElementById(id).remove()
}