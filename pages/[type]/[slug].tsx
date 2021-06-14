import React from "react";
import { Api } from "../../app/types/api";
import { GetServerSideProps } from "next";
import { getServerSideItem } from "../../app/js/lib/api/server";

interface ItemProps {
    item: Api.Item;
}

const Item: React.FC<ItemProps> = ({ item }) => {
    if (!item) return null;

    return <div>hallo</div>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    return getServerSideItem(ctx);
};

export default Item;
