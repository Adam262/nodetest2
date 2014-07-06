var userListData = [];

//DOM ready
$(function() {

  //run defined function on page load
  populateTable();

  // Username link click
  $('#ßtbody').on('click', 'td a.linkshowuser', showUserInfo);
  }); // end DOM ready. Don't mess!

/*FUNCTIONS*/
        var populateTable = function() {

            var tableContent = '';

            // jQuery AJAX call for JSON
            $.getJSON('/users/users', function(data) {
            // above aync call pulls array of userlist data from db. here we assign it to a varibale in global object. This is key to a RESTful API -- reduces calls to db
                userListData = data;

                    // For each item in our JSON, add a table row and cells to the content string
                    // .each is a JQ iterator!
                    $.each(data, function() {
                        tableContent += '<tr>';
                        tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</td>';
                        tableContent += '<td>' + this.email + '</td>';
                        tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
                        tableContent += '</tr>';
                    });

              //  Inject content string into html table
              $('#userlist tbody').html(tableContent)

                  });
            
        // Show User Info
        var showUserInfo = function(event) {

              // Prevent Link from Firing
              event.preventDefault();

              // Retrieve username from link rel attribute defined in above $.each method for table
              var thisUserName = $(this).attr('rel');

              // Get array index of object based on id value
              var arrayPosition = userListData.map(function(arrayItem) {
                  // .map creates new array of only usernames from userListData array.  Now we chain .indexOf method w/ paramter we specify on calling
                return arrayItem.username; 
                    })
                    .indexOf(thisUserName);

              // Get our User Object
              var thisUserObject = userListData[arrayPosition];

              //Populate Info Box
              $('#userInfoName').text(thisUserObject.fullname);
              $('#userInfoAge').text(thisUserObject.age);
              $('#userInfoGender').text(thisUserObject.gender);
              $('#userInfoLocation').text(thisUserObject.location);

                };

          