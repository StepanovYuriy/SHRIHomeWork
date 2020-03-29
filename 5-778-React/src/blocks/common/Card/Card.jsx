import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import cn from 'classnames';
import { ReactComponent as IconDone } from '../../../images/done_22.svg';
import { ReactComponent as IconWait } from '../../../images/wait_22.svg';
import { ReactComponent as IconFail } from '../../../images/fail_22.svg';
import { ReactComponent as IconCommit } from '../../../images/branch_16.svg';
import { ReactComponent as IconAuthor } from '../../../images/user_16.svg';
import { ReactComponent as IconDate } from '../../../images/calendar_16.svg';
import { ReactComponent as IconDuration } from '../../../images/clock_16.svg';

const STATUSES = ['done', 'wait', 'fail'];

const Card = (props) => {
    const {
        status,
        number,
        description,
        branch,
        commitHash,
        author,
        date,
        duration,
        onClick,
        mixedClassNames,
    } = props;

    const renderStatus = () => {
        switch (status) {
            case 'done':
                return <IconDone className="Card-Status Card-Status_done" />;

            case 'wait':
                return <IconWait className="Card-Status Card-Status_wait" />;

            case 'fail':
                return <IconFail className="Card-Status Card-Status_fail" />;

            default:
                return <div className="Card-Status" />;
        }
    };

    const renderNumberAndDescription = () => (
        <div className="Card-Message">
            <div className={cn('Card-Number',
                { [`Card-Number_status_${status}`]: STATUSES.includes(status) })}
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
                <span className="Card-CommitHash">{commitHash}</span>
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
                <span className="Card-DateText">{date}</span>
            </div>
            <div className="Card-Duration">
                <IconDuration className="Card-Icon" />
                <span className="Card-DurationText">{duration}</span>
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
    status: PropTypes.oneOf(STATUSES).isRequired,
    number: PropTypes.number.isRequired,
    description: PropTypes.string,
    branch: PropTypes.string.isRequired,
    commitHash: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    mixedClassNames: PropTypes.string,
};

Card.defaultProps = {
    description: '',
    onClick: () => null,
    mixedClassNames: null,
};

export default Card;
