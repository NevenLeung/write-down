import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import { Row, Col } from "antd";

import ArticleInfoSetting from '../article-edit/ArticleInfoSetting';

import { ArticleExportContainer } from "../../containers/ArticleExportContainer";
import { ArticleEditSaveContainer } from '../../containers/ArticleEditSaveContainer';

// import { MoreButton } from "./MoreButton";
import { EditorSettingButton } from "./EditorSetting";
import { UserNavButton } from "./UserNavButton";

import styles from './Header.module.css';

const EditPageHeader = ({
  id,
  markdown,
  toggleDisplayMode,
  toggleScrollSync
}) => (
  <Row className={styles.header} type="flex" justify="start" align="middle">
    <Col span={4} offset={4}>
      <Link to={'/'}>
        <LogoButton/>
      </Link>
    </Col>
    <Col span={2} offset={6}>
      <ArticleEditSaveContainer
        id={id}
        markdown={markdown}
      />
    </Col>
    <Col span={1}>
      <ArticleExportContainer />
    </Col>
    <Col span={1}>
      <ArticleInfoSetting />
    </Col>
    <Col span={1}>
      <EditorSettingButton
        toggleDisplayMode={toggleDisplayMode}
        toggleScrollSync={toggleScrollSync}
      />
    </Col>
    <Col span={1}>
      <UserNavButton/>
    </Col>
  </Row>
);

class GeneralHeader extends Component {
  render() {
    return (
      <Row className={styles.header} type="flex" justify="start" align="middle">
        <Col span={4} offset={4}>
          <Link to={'/'}>
            <LogoButton/>
          </Link>
        </Col>
        {/*<Col span={1} offset={10}>*/}
          {/*<MoreButton/>*/}
        {/*</Col>*/}
        {/*<Col span={1}>*/}
        {/*<NavButton/>*/}
        {/*</Col>*/}
        <Col span={1} offset={11}>
          <UserNavButton/>
        </Col>
      </Row>
    );
  }
}

const LogoButton = () => (
  <button className={styles.logo}>
    Write Down
  </button>
);

EditPageHeader.propTypes = {
  toggleScrollSync: PropTypes.func.isRequired,
  toggleDisplayMode: PropTypes.func.isRequired,
};

export {
  EditPageHeader,
  GeneralHeader
};