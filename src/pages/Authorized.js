import React from 'react';
import { connect } from 'dva';
import RenderAuthorized from '@/components/Authorized';
import Exception from '@/components/Exception';
// import { getAuthority } from '@/utils/authority';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Redirect from 'umi/redirect';

// const Authority = getAuthority();
// const Authorized = RenderAuthorized(Authority);

function AuthorizedPage({ children, login }) {
  const Authority = login.authority;
  const Authorized = RenderAuthorized(Authority);

  let noMatch = (
    <Exception
      type="403"
      desc={formatMessage({ id: 'app.exception.description.403' })}
      linkElement={Link}
      redirect="/user/login"
      backText="back to login"
    />
  );
  // if Authority === ['guest'] redirect to /user/login
  // You can implement the logic here.
  if (Authority === 'guest' || Authority.join('') === 'guest') {
    noMatch = <Redirect to="/user/login" />;
  }
  return (
    <Authorized authority={children.props.route.authority} noMatch={noMatch}>
      {children}
    </Authorized>
  );
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(AuthorizedPage);
