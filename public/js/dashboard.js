$(document).ready(function() {
  $("#saveNote").on("click", function() {
    var note = $("#userNotes")
      .val()
      .trim();
    //get the recipe id from element data
    //get the user id from session
    var noteObj = {
      note: note,
      RecipeId: 5,
      UserId: 1
    };
    $.ajax({
      type: "put",
      url: "/api/note",
      data: noteObj
    }).then(function() {
      $("#userNotes").val(" ");
      //get the note id of the note to attach to element for possible delete
      $.get("/api/note/" + note.RecipeId + "/" + note.UserId).then(function() {
        //change this var noteDiv to whatever it really is
        $("noteDiv").data("nodeId", result.id);
      });
    });
  });

  $("#deleteNote").on("click", function() {
    //get id from element data
    var noteId = 2;
    $.ajax({
      type: "delete",
      url: "/api/note/" + noteId
    }).then(function() {
      console.log("note deleted");
    });
  });

  $("#showmodal").on("click", function() {
    $(".modal").addClass("is-active");
  });
});
