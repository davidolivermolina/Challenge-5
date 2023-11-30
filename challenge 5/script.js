$(document).ready(function () {
    // Display the current day
    $("#currentDay").text(dayjs().format('dddd, MMMM D'));

    // Generate time blocks
    for (let hour = 9; hour <= 17; hour++) {
        let timeBlock = $("<div>").addClass("time-block");
        let timeLabel = $("<div>").text(`${hour}:00`).addClass("hour");
        let eventTextarea = $("<textarea>").attr("data-hour", hour);

        // Check the time and apply appropriate class
        if (hour < dayjs().hour()) {
            timeBlock.addClass("past");
        } else if (hour === dayjs().hour()) {
            timeBlock.addClass("present");
        } else {
            timeBlock.addClass("future");
        }

        let saveBtn = $("<button>").text("Save").addClass("saveBtn").attr("data-hour", hour);

        // Retrieve saved events from local storage
        let savedEvent = localStorage.getItem(`event-${hour}`);
        if (savedEvent) {
            eventTextarea.val(savedEvent);
        }

        timeBlock.append(timeLabel, eventTextarea, saveBtn);
        $(".container").append(timeBlock);
    }

    // Save event to local storage when the save button is clicked
    $(".saveBtn").on("click", function () {
        let hour = $(this).attr("data-hour");
        let eventText = $(`textarea[data-hour=${hour}]`).val();
        localStorage.setItem(`event-${hour}`, eventText);
    });
});
