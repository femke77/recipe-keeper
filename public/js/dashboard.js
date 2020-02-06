$(document).ready(function() {
  $("#saveNote").on("click", function() {
    var note = $("#userNotes")
      .val()
      .trim();
    //get the recipe id from element data
    //get the user id from session
    var noteObj = {
      note: note,
      RecipeId: 1,
      UserId: 1
    };

    $.ajax({
      type: "put",
      url: "/api/note",
      data: noteObj
    }).then(function() {
      $("#userNotes").val(" ");
      console.log("note saved");
    });
  });

  $("#deleteNote").on("click", function() {
    //get id from element
    var noteId = 2;
    $.ajax({
      type: "delete",
      url: "/api/note/" + noteId
    }).then(function() {
      console.log("note deleted");
    });
  });
});
