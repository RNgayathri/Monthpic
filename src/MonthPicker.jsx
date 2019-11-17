import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from "material-ui/TextField";
import { getMonth, getYear, addMonths, subMonths} from 'date-fns';
import { TooltipContainer, MonthContainer, Divider, Header, SVG } from "./MonthPickerStyles.jsx";
import Month from "./Month.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const Year = styled.span`
  user-select: none;
`;

const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  &:focus {
    outline: none;
  }
`;

const currentDate = new Date();
const currentYear = getYear(currentDate);

class MonthPicker extends React.Component {
    // Lifecycle methods
    constructor(props) {
        super(props);
        const { initialYear} = props;
            this.state = {
                year: initialYear,
                open: false,
            };
    }

    componentDidMount () {
        let selectedDate;
        if(this.props.initialValue && this.props.initialValue !== null) {
            let values = this.props.initialValue !== null && this.props.initialValue.split('/');
            let year = this.props.initialValue !== null && `20${values[1]}`;
            let month = this.props.initialValue !== null && values[0];
            selectedDate = new Date(year, month - 1);
            this.setState({
                selectedDate
            });
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.initialValue !== nextProps.initialValue)
        {
            let values = nextProps.initialValue!== null && nextProps.initialValue.split('/');
            let year = nextProps.initialValue!== null && `20${values[1]}`;
            let month = nextProps.initialValue!== null && values[0];
            this.setState({
                selectedDate: new Date(year, month - 1),
            });
        }
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        const element = event.target;
        if (this.wrapperRef && !this.wrapperRef.contains(element)) {
            this.close(event);
        }
    };

    handleMonthChange = month => event => {
        event.persist();
        const date = new Date(this.state.year, month);

        this.changeValue(date, event);
    };

    handleTriggerClick = event => {
        event.persist();

        const { onFocus, onBlur } = this.props;
        const { open } = this.state;

        this.toggleOpen();

        if (!open && onFocus) onFocus();
        if (open && onBlur) onBlur();
    };

    handleKeyDown = event => {
        const { selectedDate, year } = this.state;

        const selectedYear = getYear(selectedDate);
        const matchesCurrentYear = selectedYear === year;

        const firstMonthOfSelectedYear = new Date(year, 0);

        switch (event.key) {
            case 'ArrowLeft': {
                event.preventDefault();

                const nextSelectedDate = matchesCurrentYear ? subMonths(selectedDate, 1) : firstMonthOfSelectedYear;

                if (getYear(nextSelectedDate) < year) this.previousYear();

                return this.setFocussedMonth(nextSelectedDate);
            }

            case 'ArrowRight': {
                event.preventDefault();

                const nextSelectedDate = matchesCurrentYear ? addMonths(selectedDate, 1) : firstMonthOfSelectedYear;

                if (getYear(nextSelectedDate) > year) this.nextYear();

                return this.setFocussedMonth(nextSelectedDate);
            }

            case 'ArrowUp': {
                event.preventDefault();

                const nextSelectedDate = matchesCurrentYear ? subMonths(selectedDate, 3) : firstMonthOfSelectedYear;

                if (getYear(nextSelectedDate) < year) this.previousYear();

                return this.setFocussedMonth(nextSelectedDate);
            }

            case 'ArrowDown': {
                event.preventDefault();

                const nextSelectedDate = matchesCurrentYear ? addMonths(selectedDate, 3) : firstMonthOfSelectedYear;

                if (getYear(nextSelectedDate) > year) this.nextYear();

                return this.setFocussedMonth(nextSelectedDate);
            }

            case 'Enter': {
                event.preventDefault();
                event.persist();

                if (selectedDate) return this.changeValue(selectedDate, event);
                break;
            }

            default: {
                break;
            }
        }
    };

    // Other functions
    nextYear = () => this.setState(({ year }) => {
        const { allowedYears } = this.props;

        if (Array.isArray(allowedYears)) {
            const sortedYears = allowedYears.sort((a,b) => a - b);
            const currentIndex = sortedYears.indexOf(year);

            if (currentIndex < sortedYears.length - 1) return { year: sortedYears[currentIndex + 1] };
        }

        const nextYear = year + 1;

        if (this.isAllowedYear(nextYear)) {
            return { year: nextYear };
        }

        return null;
    });

    previousYear = () => this.setState(({ year }) => {
        const { allowedYears } = this.props;

        if (Array.isArray(allowedYears)) {
            const sortedYears = allowedYears.sort((a,b) => a - b);
            const currentIndex = sortedYears.indexOf(year);

            if (currentIndex > 0) return { year: sortedYears[currentIndex - 1] };
        }

        const previousYear = year - 1;

        if (this.isAllowedYear(previousYear)) {
            return { year: previousYear };
        }

        return null;
    });

    toggleOpen = () => {
        this.setState(({ open }) => ({ open: !open }));
    };

    setFocussedMonth = date => {
        if (this.isAllowedYear(getYear(date))) {
            this.setState({ selectedDate: date });
        }
    };

    close = () => {
        const { onBlur } = this.props;

        if (!this.state.open) return;

        this.setState({ open: false });

        if (onBlur) onBlur();
    };

    setWrapperRef = node => {
        this.wrapperRef = node;
    };

    changeValue = (date, event) => {
        //this.props.input.onChange(this.getValue(date));
        this.setFocussedMonth(date);
        this.close(event);
    };

    isAllowedYear = year => {
        const { allowedYears } = this.props;

        if (!allowedYears) return true;

        if (Array.isArray(allowedYears)) {
            return allowedYears.indexOf(year) >= 0;
        }

        const { before, after } = allowedYears;

        if (before && after) {
            return year < before && year > after;
        }

        if (before) return year < before;
        if (after) return year > after;

        return false;
    };

    // Render functions
    renderMonths = (brand) => {
        const { year: selectedYear, selectedDate } = this.state;
        const formatDate = currentDate;

        const focussedMonth = getMonth(selectedDate);
        const focussedYear = getYear(selectedDate);

        const months = [];
        let monthToText = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        for (let index = 0; index < 12; index++) {
            formatDate.setMonth(index);
            const isSelectedMonth = focussedYear === selectedYear && index === focussedMonth;
            months.push(
                <Month
                    focussed={isSelectedMonth}
                    key={index}
                    onClick={this.handleMonthChange(index)}
                    index={index}
                    brand={brand}
                >
                    {monthToText[index]}
                </Month>
            );
        }
        return months;
    };

    getValue(date){
        let d = new Date(date);
        let month = d.getMonth()+1;
        let year = d.getFullYear().toString().substr(-2);
        return `${month < 10? `0${month}`: month }/${year}`;
    }

    render () {
        const { year, open } = this.state;
        const { className, hintText, disabled, Id, primaryColor, secondaryColor, hintStyle, textFieldStyle } = this.props;
        const brand = {
            "primaryColor":primaryColor? primaryColor:"#4776E6",
            "secondaryColor":secondaryColor? secondaryColor:"#898989"
        };
        return (
            <MuiThemeProvider>
            <Container className={className} tabIndex={-1} innerRef={this.setWrapperRef} onKeyDown={this.handleKeyDown}>
                <div style={{position: 'relative'}}  onClick={this.handleTriggerClick}>
                    <TextField
                        underlineShow={false}
                        style={{
                            ...textFieldStyle,
                            border: "1px solid rgba(0,0,0,0.1)",
                            padding: "11px 20px",
                            borderRadius: "10px",
                            width: "100%",
                            maxWidth: "100px",
                            outline: "none",
                            color: "#39393A",
                            fontSize: "15px",
                            fontWeight: "500",
                            lineHeight: "18px",
                            height: "auto",
                            cursor:disabled?"not-allowed":"pointer"
                        }}
                        hintStyle={{
                            ...hintStyle,
                            bottom: "10px"
                        }}
                        id = { Id }
                        className="textField"
                        autoComplete="off"
                        hintText={hintText || "MM/YY"}
                        autoFocus = {false}
                        value={this.state.selectedDate && this.getValue(this.state.selectedDate)}
                        disabled={disabled}

                    />
            </div>
                {open && !disabled && (
                    <TooltipContainer brand={brand}>
                        <Header brand={brand}>
                            <SVG height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg' onClick={this.previousYear}>
                                <path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' fill="#fff"/>
                                <path d='M0-.5h24v24H0z' fill='none'/>
                            </SVG>
                            <Year>{year}</Year>
                            <SVG height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg' onClick={this.nextYear}>
                                <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' fill="#fff"/>
                                <path d='M0-.25h24v24H0z' fill='none'/>
                            </SVG>
                        </Header>
                        <Divider brand={brand}/>
                        <MonthContainer brand={brand}>
                            {this.renderMonths({brand})}
                        </MonthContainer>
                    </TooltipContainer>
                )}
            </Container>
            </MuiThemeProvider>
        );
    }
}

export default (MonthPicker);

MonthPicker.defaultProps = {
    hoverColor: '#d3d3d330',
    primaryColor: '#27718c',
    secondaryColor: 'white',
    locale: 'en',
    initialYear: currentYear,
};

MonthPicker.propTypes = {
    allowedYears: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
            before: PropTypes.number,
            after: PropTypes.number
        })
    ]),
    primaryColor: PropTypes.string.isRequired,
    secondaryColor: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired,
    format: PropTypes.string,
    initialYear: PropTypes.number.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    className: PropTypes.string,
    dialogClassName: PropTypes.string
};
