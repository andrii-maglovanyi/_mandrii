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

import { useSearchAllPlaces } from "@/hooks/useSearchAllPlaces";
import { CONNOTATIONS, PlaceEntry, Status } from "@/types";
import { formatDate, formatDistanceToNow } from "date-fns";
import { ObjectId } from "mongodb";

interface ExpandedPlaceViewProps {
  place: PlaceEntry;
  changePlaceStatus: (
    id: ObjectId,
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
      if (typeof value === "string") {
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
        hasProperty<PlaceEntry["geo"]>(value, "coordinates")
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
  place,
  changePlaceStatus,
}: ExpandedPlaceViewProps) => {
  const { _id, name, status } = place;

  return (
    <Card className="mb-4 mt-1 md:w-full max-w-full">
      <Column>
        <Table
          columns={COLUMNS}
          data-testid="products-list"
          dataSource={Object.entries(place).map(([name, value]) => ({
            name,
            value,
          }))}
          rowKey="name"
        />

        <Row className="flex-nowrap justify-end mt-4">
          {status !== "active" && (
            <Button
              connotation="success"
              data-testid="approve-version"
              label="Activate"
              layout="outlined"
              onClick={() => changePlaceStatus(_id, name, "active")}
              size="condensed"
            />
          )}

          {status !== "inactive" && (
            <Button
              className="ml-2"
              connotation="alert"
              data-testid="decline-version"
              label="Deactivate"
              layout="outlined"
              onClick={() => changePlaceStatus(_id, name, "inactive")}
              size="condensed"
            />
          )}
        </Row>
      </Column>
    </Card>
  );
};

const ManagePlaces = () => {
  const { isLoading, data } = useSearchAllPlaces({});
  const { showSuccess, showError } = useNotifications();

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
      dataIndex: "createdAt",
      key: "createdAt",
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

  const changePlaceStatus = async (
    id: ObjectId,
    name: string,
    status: Status
  ) => {
    try {
      fetch("/api/places/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
      showSuccess(`Place ${name} approved`);
    } catch (error: unknown) {
      showError("Failed to approve place");
    }
  };

  const deactivatePlace = async (id: ObjectId, name: string) => {};

  return (
    <Table
      expandable={{
        expandIcon: ExpandIcon,
        expandedRowRender: (props) => (
          <ExpandedPlaceView
            place={props}
            changePlaceStatus={changePlaceStatus}
          />
        ),
      }}
      columns={COLUMNS}
      dataSource={data}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default ManagePlaces;
