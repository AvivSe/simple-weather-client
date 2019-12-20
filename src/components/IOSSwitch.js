import { withStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import React from "react";

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "rgba(0,0,0,.5)",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24,
    color: `${theme.palette.primary.dark}`
  },
  track: {
    borderRadius: 24 / 2,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

export default IOSSwitch;
