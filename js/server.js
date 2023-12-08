const serverUrl = "../../SHROND/SHROND.Dev.Server/shrondDevReviews.php";

function getReviews() {
  $.ajax({
    url: serverUrl,
    method: "POST",
    data: {
      action: "get",
    },
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function insertReview() {
  $.ajax({
    url: serverUrl,
    method: "POST",
    data: {
      action: "insert",
    },
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

getReviews();
