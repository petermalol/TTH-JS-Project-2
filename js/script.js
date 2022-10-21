/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page, searchTerm) {

   // create two variables which will represent the index for the first and last student on the page
   let startIndex = 0 + 9*(page-1);
   let endIndex = 8 + 9*(page-1);
   let pagecount = Math.ceil(list.length / 9)
   if (page == pagecount) endIndex = list.length%9-1 + 9*(page-1); //sets end index for last page

   // select the element with a class of `student-list` and assign it to a variable
   let studentList = document.querySelector(".student-list");

   // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = "";

   // loop over the length of the `list` parameter
   for (let i = startIndex; i <= endIndex;){
      let studentName = (list[i].name.first +" "+list[i].name.last ); 
      //create avatar/profile picture and set src and alt to be added into the upper div later
      let avatar = document.createElement("img");
      avatar.className = "avatar";
      avatar.alt = "Profile Picture";
      avatar.src = list[i].picture.large;

      //create h3 to be added in to upper div
      let h3 = document.createElement("h3");
      h3.innerHTML = studentName;

      //create span and set class to be added in to upper div
      let studentEmail = document.createElement("span");
      studentEmail.className = "email";
      studentEmail.innerHTML = list[i].email;
        
      //create upper div to be filled with avatar, h3 and span and added in to li later
      let studentDetails = document.createElement("div");
      studentDetails.className = "student-details";
      studentDetails.append(avatar, h3, studentEmail);

      //create span and set class to be added in to lower div
      let joinedDate = document.createElement("span");
      joinedDate.className = "date";
      joinedDate.innerHTML = "Joined " + list[i].registered.date;

      //create lower div to be added in to li later
      let joinedDetails = document.createElement("div");
      joinedDetails.className = "joined-details";
      joinedDetails.append(joinedDate);

      //create li to be filled by the divs
      let studentCard = document.createElement("li");
      studentCard.className = "student-item cf";
      studentCard.append(studentDetails, joinedDetails);
         
      //adds the completed li to the ul
      studentList.append(studentCard);
      i++;
   }
 }


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list, currentPage) {
   // create a variable to calculate the number of pages needed
   let pagecount = Math.ceil(list.length / 9);
   // select the element with a class of `link-list` and assign it to a variable
   let wrapper = document.querySelector(".link-list");
   // set the innerHTML property of the variable you just created to an empty string
   wrapper.innerHTML = "";
   // loop over the number of pages needed
   for (i = 1; i <= pagecount; i++){
      // create the elements needed to display the pagination button
      //create button
      let paginationButton = document.createElement("button");
      paginationButton.type = "button";
      paginationButton.innerHTML = String(i);
      if (i == currentPage) {
         paginationButton.className = "active";
      } else{
         paginationButton.addEventListener("click", function() {
            let btnNumber = parseInt(paginationButton.innerHTML);
            currentPage = btnNumber;
            showPage(list, btnNumber, searchWord);
            addPagination(list, btnNumber);
         })
      }


      //create the li and append the button
      let paginationItem = document.createElement("li");
      paginationItem.append(paginationButton);
      wrapper.append(paginationItem);
   }
     // create the elements needed to display the pagination button
     // insert the above elements
 
   // give the first pagination button a class of "active"
 
   // create an event listener on the `link-list` element
     // if the click target is a button:
       // remove the "active" class from the previous button
       // add the active class to the clicked button
       // call the showPage function passing the `list` parameter and page to display as arguments
 }

function addSearchbox(searchWord){
   //create span
   let searchboxSpan = document.createElement("span");
   searchboxSpan.innerHTML = "Search by name";

   //create input
   let searchboxInput = document.createElement("input");
   searchboxInput.id = "search";
   searchboxInput.placeholder = "Search by name...";

   //create button icon
   let searchBtnImg = document.createElement("img");
   searchBtnImg.src = "img/icn-search.svg";
   searchBtnImg.alt = "Search icon";

   //create button and append icon
   let searchBtn = document.createElement("button");
   searchBtn.type = "button";
   searchBtn.append(searchBtnImg);

   //create eventlistener and searchfunction and add to input field with searchbtn as trigger
   searchBtn.addEventListener("click",function(){
      searchWord = document.getElementById("search").value;
      searchWord = searchWord.toLowerCase();
      let searchedStudents = [];
      for (i = 0; i < data.length; i++){
         let studentName = (data[i].name.first+" "+data[i].name.last).toLowerCase();
         //check if
         if (studentName.includes(searchWord)){
            searchedStudents.push(data[i]);
         }
      }
      showPage(searchedStudents, 1, searchWord)
      addPagination(searchedStudents, 1)
   })

   //create label
   let searchLabel = document.createElement("label");
   searchLabel.for = "search";
   searchLabel.className = "student-search"
   searchLabel.append(searchboxSpan, searchboxInput, searchBtn);
   //Select header
   let header = document.querySelector(".header");
   header.append(searchLabel);
}

/*function searchStudent(search){
   let searchWord = document.getElementById("search").value;
   console.log(searchWord)
}*/

// Call functions
searchWord = " "
currentPage = 1
showPage(data, 1, searchWord);
console.log(currentPage)
addPagination(data, currentPage);
addSearchbox(searchWord);