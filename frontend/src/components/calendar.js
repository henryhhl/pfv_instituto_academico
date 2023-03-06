import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Badge, Button, Calendar, Col, ConfigProvider, Radio, Row, Select, Tag, Tooltip, Typography } from 'antd';
import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';

import { Functions } from '../utils/functions';


export default function CalendarComponent( props ) {

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const convertDateToString = ( date ) => {
        if ( !Functions.existsData(date) ) return '';
        let year  = date.year();
        let month = date.month() + 1;
        let day   = date.date();
    
        month = month < 10 ? "0" + month : month;
        day   = day   < 10 ? "0" + day : day;
    
        return year + "-" + month + "-" + day;
    };

    const dateCurrentToString = (date) => {
        let year  = date.year();
        let month = date.month() + 1;
        let day   = date.date();
    
        month = month < 10 ? "0" + month : month;
        day   = day   < 10 ? "0" + day : day;
    
        return `${day}/${month}/${year}`;
    };

    const backMonth = (date) => {
        let year  = date.year();
        let month = date.month() + 1;
        let day   = date.date();

        if ( month > 1 ) {
            month--;
        } else {
            month = 12;
            year--;
        }
    
        month = month < 10 ? "0" + month : month;
        day   = day   < 10 ? "0" + day : day;
        return `01/${month}/${year}`;
    };

    const nextMonth = (date) => {
        let year  = date.year();
        let month = date.month() + 1;
        let day   = date.date();

        if ( month < 12 ) {
            month++;
        } else {
            month = 1;
            year++;
        }
    
        month = month < 10 ? "0" + month : month;
        day   = day   < 10 ? "0" + day : day;
        return `01/${month}/${year}`;
    };

    const onSelect = (newValue) => {
        props.onChange(newValue);
    };

    const onComponent = () => {
        return (
            <>
                <ConfigProvider locale={locale}>
                    <div 
                        style={{
                            border: `1px solid #f0f0f0`,
                            borderRadius: 2,
                            padding: 1,
                        }}
                    >
                        <Calendar 
                            onPanelChange={onPanelChange}
                            fullscreen={props.fullscreen}
                            disabledDate={ ( current ) => {
                                if ( props.disabled === true ) return true;
                                if ( props.disabledDate === false && current ) {
                                    const momentStarDate = moment(props.startDate, "DD/MM/YYYY");
                                    const momentEndDate = moment(props.endDate, "DD/MM/YYYY");
                                    const dateNow = convertDateToString(current);
                                    if ( dateNow === convertDateToString(momentStarDate) || dateNow === convertDateToString(momentEndDate) ) return false;
                                    return (
                                        current > momentEndDate.endOf('day') || current < momentStarDate.endOf('day')
                                    );
                                    
                                }
                                return false;
                            } } 
                            dateFullCellRender={ (current) => {
                                const style = {
                                    display: 'block', width: 'auto', height: 'auto', 
                                    margin: '0 4px', padding: '4px 8px 0',
                                    minWidth: 24, height: 100,
                                };
                                if ( props.disabled === false && props.disabledDate === false ) {
                                    const dateNow = convertDateToString(current);
                                    const dateNowValue = convertDateToString(props.value);
                                    const momentStarDate = moment(props.startDate, "DD/MM/YYYY");
                                    const momentEndDate = moment(props.endDate, "DD/MM/YYYY");
                                    if ( (dateNow === convertDateToString(momentStarDate) || dateNow === convertDateToString(momentEndDate)) && dateNow !== dateNowValue ) {
                                        style.border = '1px solid #1890ff';
                                        style.color = '#FFFFFF'; 
                                        style.background = '#1677FF';
                                        style.borderRadius = 8;
                                    } else {
                                        if ( dateNow === dateNowValue ) {
                                            style.borderTop = '4px solid #1890ff';
                                            style.background = '#E6F7FF';
                                            style.color = '#1890FF';
                                            style.borderRadius = 5;
                                        } else {
                                            style.border = 0;
                                            style.borderTop = '2px solid #f0f0f0';
                                        }
                                    }
                                }
                                // if ( current.toDate().getDay() % 2 === 0 ) return null;
                                return (
                                    <div style={style}
                                        onClick={ () => props.onClickDay(dateCurrentToString(current)) }
                                    >
                                        { current.date() }
                                        <div className="calendar-dateCellRender">
                                                {/* <Badge color="lime" text={'1'} /> */}
                                            { props.arrayCalendarioAcademico.map( (item, key) => {
                                                if ( item.fechanota  === dateCurrentToString(current) ) {
                                                    return (
                                                        <div key={key} style={{ marginTop: -1, marginBottom: 3, }}>
                                                            <Tooltip title={item.nota}>
                                                                <Tag color="processing">{item.nota}</Tag>
                                                            </Tooltip>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            } ) }
                                        </div>
                                    </div>
                                );
                            } }
                            value={props.value}
                            onSelect={onSelect}

                            headerRender={({ value, type, onChange, onTypeChange }) => {
                                const start = 0;
                                const end = 12;
                                const monthOptions = [];
                                const current = value.clone();
                                const localeData = value.localeData();
                                const months = [];

                                for (let i = 0; i < 12; i++) {
                                    current.month(i);
                                    months.push(localeData.monthsShort(current));
                                }

                                for (let i = start; i < end; i++) {
                                    monthOptions.push(
                                        <Select.Option key={i} value={i} className="month-item">
                                            {months[i]}
                                        </Select.Option>,
                                    );
                                }
                                const year = value.year();
                                const month = value.month();
                                const options = [];

                                for (let i = year - 10; i < year + 10; i += 1) {
                                    options.push(
                                        <Select.Option key={i} value={i} className="year-item">
                                            {i}
                                        </Select.Option>,
                                    );
                                }
                                return (
                                    <div style={{ padding: 8, }}>
                                        <Row gutter={8} justify='space-between'>
                                            <Row gutter={8}>
                                                <Col>
                                                    <Button onClick={() => props.onChange(moment(new Date()))}>
                                                        Hoy
                                                    </Button>
                                                    { type === 'month' &&
                                                        <>
                                                            <Button 
                                                                onClick={() => {
                                                                    if ( props.value ) {
                                                                        props.onChange(moment(backMonth(props.value), "DD/MM/YYYY"));
                                                                    }
                                                                }}
                                                            >
                                                                Back
                                                            </Button>
                                                            <Button 
                                                                onClick={() => {
                                                                    if ( props.value ) {
                                                                        props.onChange(moment(nextMonth(props.value), "DD/MM/YYYY"));
                                                                    }
                                                                }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                { Functions.existsData(props.startDate) && Functions.existsData(props.endDate) && props.disabled === false && 
                                                    <Col>
                                                        <Button onClick={() => props.onChange(moment(props.startDate, "DD/MM/YYYY"))}>
                                                            Periodo Inicio
                                                        </Button>
                                                        <Button onClick={() => props.onChange(moment(props.endDate, "DD/MM/YYYY"))}>
                                                            Periodo Final
                                                        </Button>
                                                    </Col>
                                                }
                                                <Col>
                                                    <Select
                                                        dropdownMatchSelectWidth={false}
                                                        className="my-year-select"
                                                        value={year}
                                                        onChange={(newYear) => {
                                                            const now = value.clone().year(newYear);
                                                            onChange(now);
                                                        }}
                                                    >
                                                        {options}
                                                    </Select>
                                                </Col>
                                                <Col>
                                                    <Select
                                                        dropdownMatchSelectWidth={false}
                                                        value={month}
                                                        onChange={(newMonth) => {
                                                            const now = value.clone().month(newMonth);
                                                            onChange(now);
                                                        }}
                                                    >
                                                        {monthOptions}
                                                    </Select>
                                                </Col>
                                                <Col>
                                                    <Radio.Group
                                                        onChange={(e) => onTypeChange(e.target.value)}
                                                        value={type}
                                                    >
                                                        <Radio.Button value="month">Mes</Radio.Button>
                                                        <Radio.Button value="year">Año</Radio.Button>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </ConfigProvider>
            </>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

CalendarComponent.propTypes = {
    fullscreen: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledDate: PropTypes.bool,
    dateCellActive: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    value: PropTypes.any,
    onClickDay: PropTypes.func,
    onChange: PropTypes.func,
    arrayCalendarioAcademico: PropTypes.array,
}

CalendarComponent.defaultProps = {
    fullscreen: true,
    disabled: false,
    disabledDate: true,
    dateCellActive: false,
    onClickDay: () => {},
    onChange: () => {},
    value: null,
    arrayCalendarioAcademico: [],
}
