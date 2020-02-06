$(document).ready(function() {
  $("#saveNote").on("click", function() {
    var note = $("#userNotes")
      .val()
      .trim();
    //get the recipe id
    //get the user id
    var noteObj = {
      note: note,
      RecipeId: 1,
      UserId: 1
    };
    //make an object
    //call the put route w ajax
    $.ajax({
      type: "put",
      url: "/api/note",
      data: noteObj
    }).then(function() {
      console.log("note saved");
    });
  });

  $("#deleteNote").on("click", function() {
    //get the note id
    //call delete route w ajax
    console.log("note deleted");
  });
});
