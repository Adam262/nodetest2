var userListData = [];

//DOM ready
$(function() {

  //run defined function on page load
  populateTable();

  // username link click to populate info spans
  $('#userlist tbody').on('click', 'td a.linkshowuser', showUserInfo);

  // delete user
  $('#userlist tbody').on('click', 'td a.linkdeleteuser', deleteUser);
  
  // submit form
  $('#btnAddUser').on('click', addUser);



  }); // end DOM ready. Don't mess!

/*FUNCTIONS*/
var populateTable = function() {

      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON('/users/users', function(data) {

      // above async call pulls JSON of userlist data from db. here we assign it to a variable in global object. This is key to a RESTful API -- reduces calls to db
          
          userListData = data;

        // .each is a JQ iterator. For each item in our JSON, add a table row and cells to the content string

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
      
        };

      // Show User Info

 // Add User
var addUser = function (event) {
    event.preventDefault();

// Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var userHash = {
          username: $('#inputUserName').val(),
          email: $('#inputUserEmail').val(),
          fullname: $('#inputUserFullname').val(),
          age: $('#inputUserAge').val(),
          location: $('#inputUserLocation').val(),
          gender: $('#inputUserGender').val(),
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
          type: 'POST',
          data: userHash,
          url: '/users/adduser',
          dataType: 'JSON'
        }).done(function(response){

      // Check for successful (blank) response
      if (response.msg === '') {

          // Clear the form inputs
            $('#addUser input').val('');

          // Update the table
            populateTable();

        } else {

          // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

            }
        });
    } else {
      // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
var deleteUser = function (event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
  
var showUserInfo = function (event) {

        // Prevent Link from Firing
        event.preventDefault();

        // Retrieve username from link rel attribute defined in above $.each method for table
        var thisUserName = $(this).attr('rel');
        console.log(thisUserName);

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


          