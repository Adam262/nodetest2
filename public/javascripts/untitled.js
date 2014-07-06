var userListData = [];

//DOM ready
$(function() {

        //run defined function on page load
        populateTable();
  }); // end DOM ready. Don't mess!

        var populateTable = function() {

            var tableContent = '';

            // jQuery AJAX call for JSON
            $.getJSON('/users/users', function(data) {

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

                }

          