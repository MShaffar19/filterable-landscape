import React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import classNames from 'classnames'
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import Presets from './Presets';
import Ad from './Ad';
import MainContentContainer from './MainContentContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import HomePageScrollerContainer from './HomePageScrollerContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import ItemDialogButtonsContainer from './ItemDialogButtonsContainer';
import HeaderContainer from './HeaderContainer';
import SummaryContainer from './SummaryContainer';
import Footer from './Footer';

import isIphone from '../utils/isIphone';

const state = {
  lastScrollPosition: 0
};

const HomePage = ({ready, hasSelectedItem, filtersVisible, hideFilters, showFilters, onClose}) => {
  if (!ready) {
    return (
      <div>
        <HomePageUrlContainer />
      </div>
    )
  }
  // if (isIphone) {
    // return(
      // <div className="app background">
        // <div className="iphoneScroller">
          // <HeaderContainer/>
          // <IconButton className="sidebar-show" onClick={showFilters}><Icon>menu</Icon></IconButton>
          // <div className="1shadow"/>
          // <div className="container" />
          // <div className="app-overlay" onClick={hideFilters}></div>
          // <HomePageUrlContainer />
          // <div className="main">
            // <div className="disclaimer">
              // <h1>CNCF Cloud Native Interactive Landscape</h1>
              // This is the interactive counterpart to CNCF's Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
              // Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
              // even better, open a pull request. Greyed logos are not open source.
            // </div>
            // <SummaryContainer />
            // <MainContentContainer/>
            // <Footer/>
          // </div>
        // </div>
      // </div>);
  // }

  if (isIphone) {
    if (hasSelectedItem) {
      if (!document.querySelector('.iphone-scroller')) {
        state.lastScrollPosition = document.scrollingElement.scrollTop;
        document.scrollingElement.scrollTop = 0;
      }
      document.querySelector('html').classList.add('has-selected-item');
    } else {
      document.querySelector('html').classList.remove('has-selected-item');
      if (document.querySelector('.iphone-scroller')) {
        document.scrollingElement.scrollTop = state.lastScrollPosition;
      }
    }
    //try to get a current scroll if we are in a normal mode
  }

  return (
    <div>
    <HomePageScrollerContainer/>
    <ItemDialogContainer/>
    { isIphone && <ItemDialogButtonsContainer/> }
    <div className={classNames('app',{'filters-opened' : filtersVisible, 'background': isIphone && hasSelectedItem})}>
      <div className={classNames({"shadow": isIphone && hasSelectedItem})} onClick={onClose} />
      <div style={{marginTop: (isIphone && hasSelectedItem) ? -state.lastScrollPosition : 0}} className={classNames({"iphone-scroller": isIphone && hasSelectedItem})} >
        <HeaderContainer/>
        <IconButton className="sidebar-show" onClick={showFilters}><Icon>menu</Icon></IconButton>
        <div className="sidebar">
          <IconButton className="sidebar-collapse" onClick={hideFilters}><Icon>close</Icon></IconButton>
          <ResetFiltersContainer />
          <Grouping/>
          <Sorting/>
          <Filters />
          <Presets />
          <Ad />
        </div>

        <div className="app-overlay" onClick={hideFilters}></div>

        <HomePageUrlContainer />

        <div className="main">
          <div className="disclaimer">
            <h1>CNCF Cloud Native Interactive Landscape</h1>
            This is the interactive counterpart to CNCF's Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
            Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
            even better, open a pull request. Greyed logos are not open source.
          </div>

          <SummaryContainer />
          <MainContentContainer/>
          <Footer/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
