import React, {useState} from "react";
import s from "./ScheduleItem.module.css";
import {format} from "date-fns";

function ScheduleItem(props) {
    const onItemClick = () => {
        if (props.receptionInfo.patient) {
            props.setIsAddPatientForm(false);
            props.setIsAddReceptionForm(false);
            props.setCurrentReceptionInfo(props.receptionInfo);
            props.setIsReceptionInfo(true);
        }
    }

    const getItemClassName = () => {
        switch (props.receptionInfo.color) {
            case "red": return s.scheduleActiveItemRed;
            case "blue": return s.scheduleActiveItemBlue;
            case "green": return s.scheduleActiveItemGreen;
            case "purple": return s.scheduleActiveItemPurple;
        }
    }

    return (
        <div
            className={props.receptionInfo.patient ? getItemClassName() : s.scheduleItem}
            onClick={onItemClick}
        >
            {props.receptionInfo.patient &&
                <div className={s.patientInfo}>
                    <div className={s.patient}>{props.receptionInfo.patient}</div>
                    <div className={s.description}>{props.receptionInfo.description}</div>
                    {/*<div className={s.description}>{props.color}</div>*/}
                </div>
            }
            <div> </div>
            <div className={s.time}>
               <div>
                   {props.receptionInfo.patient ? format(props.receptionInfo.date, 'yyyy-MM-dd') : ""}
               </div>
               <div>
                   {props.receptionInfo.patient ? props.receptionInfo.time : ""}
               </div>
            </div>
        </div>
    )
}

export default ScheduleItem;