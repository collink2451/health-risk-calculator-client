const api_url = "/api";

setInterval(function () {
  ping();
}, 120000);

function ping() {
  $.ajax({
    type: "GET",
    url: api_url + "/ping",
    dataType: "text",
    success: function (response) {
      console.log(response);
    },
  });
}

function removeBG(elementId) {
  $(elementId).removeClass("bg-success");
  $(elementId).removeClass("bg-warning");
  $(elementId).removeClass("bg-danger");
  $(elementId).removeClass("bg-warning-subtle");
}

function calculateTotalRisk() {
  data = {
    age: parseInt($("#age-points").val()),
    bmi: parseInt($("#bmi-points").val()),
    bp: parseInt($("#bp-points").val()),
    disease: parseInt($("#disease-points").val()),
  };

  $.ajax({
    type: "POST",
    url: api_url + "/calculate_risk",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      $("#overall-points").val(response.score);
      $("#overall-risk").val(response.risk);
      removeBG("#overall-points");
      removeBG("#overall-risk");
      $("#overall-points").addClass(response.color);
      $("#overall-risk").addClass(response.color);
    },
  });
}

function calculateAgeRisk() {
  data = {
    age: $("#age").val(),
  };

  if ($("#age").val() < 10) {
    $("#age").removeClass("is-valid");
    $("#age").addClass("is-invalid");
  } else {
    $("#age").removeClass("is-invalid");
    $("#age").addClass("is-valid");
  }

  $.ajax({
    type: "POST",
    url: api_url + "/age_to_points",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      $("#age-points").val(response.points);
      removeBG("#age-points");
      $("#age-points").addClass(response.color);
      calculateTotalRisk();
    },
  });
}

function calculateBMIRisk() {
  data = {
    height: $("#height").val(),
    weight: $("#weight").val(),
  };

  if ($("#height").val() < 24) {
    $("#height").removeClass("is-valid");
    $("#height").addClass("is-invalid");
  } else {
    $("#height").removeClass("is-invalid");
    $("#height").addClass("is-valid");
  }
  if ($("#weight").val() < 50) {
    $("#weight").removeClass("is-valid");
    $("#weight").addClass("is-invalid");
  } else {
    $("#weight").removeClass("is-invalid");
    $("#weight").addClass("is-valid");
  }

  $.ajax({
    type: "POST",
    url: api_url + "/bmi_to_points",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      $("#bmi-points").val(response.points);
      $("#bmi-risk").val(response.bmi);

      removeBG("#bmi-points");
      removeBG("#bmi-risk");
      $("#bmi-points").addClass(response.color);
      $("#bmi-risk").addClass(response.color);
      calculateTotalRisk();
    },
  });
}

function calculateBPRisk() {
  data = {
    systolic: $("#systolic").val(),
    diastolic: $("#diastolic").val(),
  };

  if ($("#systolic").val() < 80) {
    $("#systolic").removeClass("is-valid");
    $("#systolic").addClass("is-invalid");
  } else {
    $("#systolic").removeClass("is-invalid");
    $("#systolic").addClass("is-valid");
  }
  if ($("#diastolic").val() < 40) {
    $("#diastolic").removeClass("is-valid");
    $("#diastolic").addClass("is-invalid");
  } else {
    $("#diastolic").removeClass("is-invalid");
    $("#diastolic").addClass("is-valid");
  }

  $.ajax({
    type: "POST",
    url: api_url + "/bp_to_points",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      $("#bp-points").val(response.points);
      $("#bp-risk").val(response.bp);
      removeBG("#bp-points");
      removeBG("#bp-risk");
      $("#bp-points").addClass(response.color);
      $("#bp-risk").addClass(response.color);
      calculateTotalRisk();
    },
  });
}

function calculateDiseaseRisk() {
  data = {
    diabetes: $("#diabetes").is(":checked"),
    cancer: $("#cancer").is(":checked"),
    alzhe: $("#alzhe").is(":checked"),
  };

  $.ajax({
    type: "POST",
    url: api_url + "/disease_to_points",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      $("#disease-points").val(response.points);

      removeBG("#disease-points");
      $("#disease-points").addClass(response.color);
      calculateTotalRisk();
    },
  });
}

$(".age-input").on("keyup", function () {
  calculateAgeRisk();
});

$(".bmi-input").on("keyup", function () {
  calculateBMIRisk();
});

$(".bp-input").on("keyup", function () {
  calculateBPRisk();
});

$(".disease-input").on("change", function () {
  calculateDiseaseRisk();
});

$(window).on("load", function () {
  ping();
  calculateAgeRisk();
  calculateBMIRisk();
  calculateBPRisk();
  calculateTotalRisk();
  calculateDiseaseRisk();
});
