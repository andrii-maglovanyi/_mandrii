import {
  Badge,
  Button,
  Card,
  Column,
  Expand,
  EXPAND_COLUMN,
  ImageCarousel,
  Phrase,
  Row,
  Table,
  Tooltip,
} from "@/components";
import { useNotifications } from "@/hooks";

import { useLocations } from "@/hooks";
import { CONNOTATIONS, Status, Ukrainian_Locations } from "@/types";
import { formatDate, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";

interface ExpandedPlaceViewProps {
  isBusy: boolean;
  location: Ukrainian_Locations;
  changeLocationStatus: (
    id: number,
    name: string,
    status: Status
  ) => Promise<void>;
}

const hasProperty = <T extends object>(
  value: unknown,
  property: keyof T
): value is T & Record<keyof T, unknown> => {
  return typeof value === "object" && value !== null && property in value;
};

const COLUMNS = [
  {
    key: "name",
    render: (name: unknown) =>
      typeof name === "string" && (
        <Phrase className="text-primary-700">{name}</Phrase>
      ),
    title: "Name",
  },
  {
    key: "value",
    render: (value: unknown, { name }: { name: string }) => {
      if (name === "website" && typeof value === "string") {
        return <Link href={value}>{value}</Link>;
      } else if (typeof value === "string" || typeof value === "number") {
        return value ?? "-";
      } else if (name === "images" && Array.isArray(value) && value.length) {
        return (
          <Column className="relative w-96 h-96">
            <ImageCarousel
              images={value.map(
                (image) =>
                  `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${image}`
              )}
            />
          </Column>
        );
      } else if (Array.isArray(value) && value.length) {
        return value.join(", ");
      } else if (
        name === "geo" &&
        hasProperty<Ukrainian_Locations["geo"]>(value, "coordinates")
      ) {
        return (
          <>
            <a
              target="_blank"
              href={`https://www.google.com/maps?q=${value.coordinates[1]},${value.coordinates[0]}`}
            >
              <Badge connotation="cta" layout="soft">
                {value.coordinates[1]}, {value.coordinates[0]}
              </Badge>
            </a>
          </>
        );
      } else if (name === "description") {
        return (
          <Column>
            <Row>
              <Column>🇺🇦</Column>
              <Column className="ml-2 grow">
                {hasProperty<{ uk: string }>(value, "uk") ? (
                  <Phrase>{value.uk}</Phrase>
                ) : (
                  "-"
                )}
              </Column>
            </Row>
            <Row>
              <Column>🇬🇧</Column>
              <Column className="ml-2 grow">
                {hasProperty<{ en: string }>(value, "en") ? (
                  <Phrase>{value.en}</Phrase>
                ) : (
                  "-"
                )}
              </Column>
            </Row>
          </Column>
        );
      } else {
        return "-";
      }
    },
    title: "Value",
    width: "100%",
  },
];

const ExpandIcon = ({
  expanded,
  onExpand,
  record,
}: {
  expanded: boolean;
  onExpand: (
    record: any,
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  record: any;
}) => <Expand expanded={expanded} onExpand={(e) => onExpand(record, e)} />;

const ExpandedPlaceView = ({
  location,
  isBusy,
  changeLocationStatus,
}: ExpandedPlaceViewProps) => {
  const { id, name, status } = location;

  return (
    <Card className="mb-4 mt-1 md:w-full max-w-full">
      <Column>
        <Table
          columns={COLUMNS}
          data-testid="products-list"
          dataSource={Object.entries(location).map(([name, value]) => ({
            name,
            value,
          }))}
          rowKey="name"
        />

        <Row className="flex-nowrap justify-end mt-4">
          {status !== "active" && (
            <Button
              disabled={isBusy}
              connotation="success"
              data-testid="activate-location"
              label="Activate"
              layout="filled"
              onClick={() => changeLocationStatus(id, name, "active")}
              size="condensed"
            />
          )}

          {status !== "rejected" && (
            <Button
              disabled={isBusy}
              className="ml-2"
              connotation="alert"
              data-testid="reject-location"
              label="Reject"
              layout="outlined"
              onClick={() => changeLocationStatus(id, name, "rejected")}
              size="condensed"
            />
          )}

          {status !== "archived" && (
            <Button
              disabled={isBusy}
              className="ml-2"
              connotation="primary"
              data-testid="archive-location"
              label="Archive"
              layout="outlined"
              onClick={() => changeLocationStatus(id, name, "archived")}
              size="condensed"
            />
          )}
        </Row>
      </Column>
    </Card>
  );
};

const ManagePlaces = () => {
  const { getAdminLocations, updateLocationStatus } = useLocations();
  const { loading, data, error } = getAdminLocations({});
  const { showSuccess, showError } = useNotifications();
  const [isBusy, setIsBusy] = useState(false);

  const COLUMNS = [
    {
      dataIndex: "name",
      key: "name",
      sorter: false,
      title: "Name",
      render: (name: unknown) => <strong>{String(name)}</strong>,
    },
    {
      dataIndex: "category",
      key: "category",
      sorter: false,
      title: "Category",
    },

    {
      dataIndex: "created_at",
      key: "created_at",
      sorter: false,
      render: (createdAt: unknown) =>
        typeof createdAt === "string" ? (
          <Tooltip text={formatDate(createdAt, "dd/MM/yyyy HH:mm")}>
            <span style={{ cursor: "default" }}>
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
              })}
            </span>
          </Tooltip>
        ) : (
          "-"
        ),
      title: "Created",
    },
    {
      dataIndex: "status",
      key: "status",
      sorter: false,
      title: "Status",
      render: (status: unknown) => {
        let connotation = CONNOTATIONS.primary;
        if (status === "active") {
          connotation = CONNOTATIONS.success;
        } else if (status === "inactive") {
          connotation = CONNOTATIONS.alert;
        }

        return (
          <Badge
            className="cursor-default"
            connotation={connotation}
            layout={status ? "filled" : "soft"}
          >
            {String(status) ?? "-"}
          </Badge>
        );
      },
    },
    EXPAND_COLUMN,
  ];

  const changeLocationStatus = async (
    id: number,
    name: string,
    status: Status
  ) => {
    const { data, error, loading } = await updateLocationStatus(id, status);
    setIsBusy(loading);

    if (data) {
      showSuccess(
        `Status of ${name} updated to ${data.update_ukrainian_locations_by_pk.status}`
      );
    }

    if (error) {
      console.error(error.message);
      showError("Failed to update location status");
    }
  };

  return (
    <Table
      expandable={{
        expandIcon: ExpandIcon,
        expandedRowRender: (props) => (
          <ExpandedPlaceView
            location={props}
            isBusy={isBusy}
            changeLocationStatus={changeLocationStatus}
          />
        ),
      }}
      columns={COLUMNS}
      dataSource={data}
      loading={loading}
      rowKey="id"
    />
  );
};

export default ManagePlaces;
