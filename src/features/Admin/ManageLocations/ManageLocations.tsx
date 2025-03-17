import { formatDate, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";

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
import {
  CONNOTATIONS,
  GetAdminLocationsQuery,
  Ukrainian_Location_Statuses_Enum,
  Ukrainian_Locations,
} from "@/types";

interface ExpandedPlaceViewProps {
  changeLocationStatus: (
    id: number,
    name: string,
    status: Ukrainian_Location_Statuses_Enum
  ) => Promise<void>;
  isBusy: boolean;
  location: GetAdminLocationsQuery["ukrainian_locations"][number];
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
          <Column className="relative h-96 w-96">
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
              rel="noreferrer"
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
    record: GetAdminLocationsQuery["ukrainian_locations"][number],
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  record: GetAdminLocationsQuery["ukrainian_locations"][number];
}) => <Expand expanded={expanded} onExpand={(e) => onExpand(record, e)} />;

const ExpandedPlaceView = ({
  changeLocationStatus,
  isBusy,
  location,
}: ExpandedPlaceViewProps) => {
  const { id, name, status } = location;

  return (
    <Card
      className={`
        mt-1 mb-4 max-w-full
        md:w-full
      `}
    >
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

        <Row className="mt-4 flex-nowrap justify-end">
          {status !== "ACTIVE" && (
            <Button
              disabled={isBusy}
              connotation="success"
              data-testid="activate-location"
              label="Activate"
              layout="filled"
              onClick={() =>
                changeLocationStatus(
                  id,
                  name,
                  Ukrainian_Location_Statuses_Enum.Active
                )
              }
              size="condensed"
            />
          )}

          {status !== "REJECTED" && (
            <Button
              disabled={isBusy}
              className="ml-2"
              connotation="alert"
              data-testid="reject-location"
              label="Reject"
              layout="outlined"
              onClick={() =>
                changeLocationStatus(
                  id,
                  name,
                  Ukrainian_Location_Statuses_Enum.Rejected
                )
              }
              size="condensed"
            />
          )}

          {status !== "ARCHIVED" && (
            <Button
              disabled={isBusy}
              className="ml-2"
              connotation="primary"
              data-testid="archive-location"
              label="Archive"
              layout="outlined"
              onClick={() =>
                changeLocationStatus(
                  id,
                  name,
                  Ukrainian_Location_Statuses_Enum.Archived
                )
              }
              size="condensed"
            />
          )}
        </Row>
      </Column>
    </Card>
  );
};

const ManagePlaces = () => {
  const { updateLocationStatus, useAdminLocations } = useLocations();
  const { data, loading } = useAdminLocations({});
  const { showError, showSuccess } = useNotifications();
  const [isBusy, setIsBusy] = useState(false);

  const COLUMNS = [
    {
      dataIndex: "name",
      key: "name",
      render: (name: unknown) => <strong>{String(name)}</strong>,
      sorter: false,
      title: "Name",
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
      sorter: false,
      title: "Created",
    },
    {
      dataIndex: "status",
      key: "status",
      render: (status: unknown) => {
        let connotation = CONNOTATIONS.primary;
        if (status === Ukrainian_Location_Statuses_Enum.Active) {
          connotation = CONNOTATIONS.success;
        } else if (status === Ukrainian_Location_Statuses_Enum.Rejected) {
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
      sorter: false,
      title: "Status",
    },
    EXPAND_COLUMN,
  ];

  const changeLocationStatus = async (
    id: number,
    name: string,
    status: Ukrainian_Location_Statuses_Enum
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
