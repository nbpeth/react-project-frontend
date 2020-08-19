import React, { Component } from "react";

const Task = (props) => {
  const renderTask = () => {
    if (props.completed) {
      return (
        //  I'd clean this up by having each possible outcome be rendered by a function - extract these results into a function that returns the complete html so you have a clear decision:result tree
        <div>
          <li id={props.task.attributes.id} onClick={props.showComponent}>
            {props.task.attributes.content}
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li
            id={props.task.attributes.id}
            className={
              props.task.attributes.due_date > new Date() // Timezones are tricky - new Date() will evaluate to a date at the timezone of the user agent; does  `task.attributes.due_date` provide a UTC date or the timezone of the client?
                  // `Date` gets used a lot, but what happens if you change your mind on how you want ot handle dates internally and use `moment`
                  // you can make a wrapper for dates, or a service with common api functions that are library agnostic.. like `dateService.isGreaterThan(otherdate)` and maybe that implementation underneath uses moment to evaluate the dates and return a bool
                ? "text-default"
                : "text-danger"
            }
            onClick={props.showComponent}
          >
            {props.task.attributes.content} - by{" "}
            {todayOrTomorrow(props.task.attributes.due_date) || // this is some pretty esoteric business logic that could use some explanation
                // it'd be nice to have a named function that evaluates to this final value
              displayDate(props.task.attributes.due_date)}
          </li>
        </div>
      );
    }
  };

  return <div>{renderTask()}</div>;
};

const todayOrTomorrow = (date) => {
  if (
      // no need to instantiate a new instance of Date for each equality operator, you can just make a date and compare: `const today = new Date();`
      // that being said, there are some lovely libraries that do this work for you - I'd recommend moment.js https://momentjs.com/ because dates are nasty business

    date.getFullYear() === new Date().getFullYear() &&
    date.getMonth() === new Date().getMonth() &&
    date.getDate() === new Date().getDate()
  ) {
    return "Today"; // avoid using string literals - "magic strings". they're brittle nad often get repeated, extract any literals to constants in a constant library or dictionary that is localized to where it's needed. this is true for numbers also "see: magic numbers"
  } else if (
    date.getFullYear() === new Date().getFullYear() &&
    date.getMonth() === new Date().getMonth() &&
    date.getDate() === new Date().getDate() + 1
  ) {
    return "Tomorrow";
  } else {
    return false;
  }
};

const displayDate = (dateString) => {
  const date = new Date(dateString);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log('month', date.getMonth(), months[date.getMonth()])
  const weekday = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // you can also uses moment to build these formatted date strings as you see fit; moment().format(<dateFormat>)
  return `${weekday}, ${month} ${day} ${year}`;
};

export default Task;
