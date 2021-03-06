import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { zonedTimeToUtc } from 'date-fns-tz';
import { ReactComponent as IconDone } from '../../../images/done_22.svg';
import { ReactComponent as IconWait } from '../../../images/wait_22.svg';
import { ReactComponent as IconFail } from '../../../images/fail_22.svg';
import { ReactComponent as IconCommit } from '../../../images/branch_16.svg';
import { ReactComponent as IconAuthor } from '../../../images/user_16.svg';
import { ReactComponent as IconDate } from '../../../images/calendar_16.svg';
import { ReactComponent as IconDuration } from '../../../images/clock_16.svg';

const STATUSES = ['Waiting', 'InProgress', 'Success', 'Fail', 'Canceled'];

const Card = (props) => {
    const {
        number,
        status,
        description,
        branch,
        commitHash,
        author,
        date,
        duration,
        onClick,
        mixedClassNames,
    } = props;

    const getDateStartText = () => {
        if (!date) return '-';

        return format(zonedTimeToUtc(date, 'UTC'), 'd MMM HH:mm', { locale: ru });
    };

    const getDurationText = () => {
        if (!duration) return '-';

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor(duration / 60) - (hours * 60);
        const seconds = Math.floor(duration % 60);

        if (!hours && !minutes) {
            return `${seconds} сек`;
        }

        if (!hours) {
            return `${minutes} мин ${seconds} сек`;
        }

        return `${hours} ч ${minutes} мин ${seconds} сек`;
    };

    const renderStatus = () => {
        switch (status) {
            case 'Success':
                return <IconDone className="Card-Status Card-Status_done" title={status} />;

            case 'Waiting':
            case 'InProgress':
                return <IconWait className="Card-Status Card-Status_wait" title={status} />;

            case 'Fail':
            case 'Canceled':
                return <IconFail className="Card-Status Card-Status_fail" title={status} />;

            default:
                return <div className="Card-Status" />;
        }
    };

    const renderNumberAndDescription = () => (
        <div className="Card-Message">
            <div className={cn('Card-Number',
                {
                    'Card-Number_status_done': status === 'Success',
                    'Card-Number_status_wait': ['Waiting', 'InProgress'].includes(status),
                    'Card-Number_status_fail': ['Fail', 'Canceled'].includes(status),
                })}
            >
                {`#${number}`}
            </div>
            <div className="Card-Description">
                {description}
            </div>
        </div>
    );

    const renderCommitAndAuthor = () => (
        <div className="Card-Meta">
            <div className="Card-Commit">
                <IconCommit className="Card-Icon" />
                <span className="Card-Branch">{branch}</span>
                <span className="Card-CommitHash">{commitHash.slice(0, 7)}</span>
            </div>
            <div className="Card-Author">
                <IconAuthor className="Card-Icon" />
                <span className="Card-AuthorName">{author}</span>
            </div>
        </div>
    );

    const renderMainContainer = () => (
        <div className="Card-MainContainer">
            {renderNumberAndDescription()}
            {renderCommitAndAuthor()}
        </div>
    );

    const renderRightContainer = () => (
        <div className="Card-RightContainer">
            <div className="Card-Date">
                <IconDate className="Card-Icon" />
                <span className="Card-DateText">
                    {getDateStartText()}
                </span>
            </div>
            <div className="Card-Duration">
                <IconDuration className="Card-Icon" />
                <span className="Card-DurationText">
                    {getDurationText()}
                </span>
            </div>
        </div>
    );

    return (
        // TODO Разобраться, когда будет время
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
        <div className={cn('Card', mixedClassNames)}
             role="button"
             onClick={onClick}
        >
            {renderStatus()}
            <div className="Card-Info">
                {renderMainContainer()}
                {renderRightContainer()}
            </div>
        </div>
    );
};

Card.propTypes = {
    number: PropTypes.number.isRequired,
    status: PropTypes.oneOf(STATUSES).isRequired,
    description: PropTypes.string,
    branch: PropTypes.string.isRequired,
    commitHash: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string,
    duration: PropTypes.number,
    onClick: PropTypes.func,
    mixedClassNames: PropTypes.string,
};

Card.defaultProps = {
    description: '',
    date: null,
    duration: 0,
    onClick: () => null,
    mixedClassNames: null,
};

export default Card;
