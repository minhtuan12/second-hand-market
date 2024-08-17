import React from "react";
import {Empty, Pagination, Table} from "antd";
import './styles.scss'

function TableDefault(props) {
  let {
    dataSource, columns, pagination, loading,
    onChange, handleSelectPagination, extraClassName, scroll
  } = props;

  const customEmptyTable = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Không có dữ liệu'}/>

  return(
    <div>
      <Table
        loading={loading}
        className={`main-table mb-[25px] ${extraClassName ? extraClassName : ''}`}
        rowClassName={`main-row`}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={'_id'}
        onChange={onChange}
        scroll={scroll ? scroll : {x: 1000, y: 500 }}
        locale={{ emptyText: customEmptyTable }}
      />
      <Pagination
        className={'flex justify-end general-pagination'}
        current={pagination.currentPage}
        total={pagination.totalRecord}
        pageSize={pagination.perPage || 0}
        onChange={(e) => handleSelectPagination(e)}
        showSizeChanger={false}
        showLessItems
      />
    </div>
  )
}
export default TableDefault

