import { Badge, Column, Row, Table, Tooltip } from "@/components";
import { Dictionary } from "@/dictionaries";
import ShareLocationLink from "@/features/ShareLocationLink/ShareLocationLink";
import { useLanguage, useLocations } from "@/hooks";
import { CONNOTATIONS } from "@/types";
import { formatDate, formatDistanceToNow } from "date-fns";
import { enUS, uk } from "date-fns/locale";

const MyLocations = () => {
  const { getUserLocations } = useLocations();
  const { data, error, loading } = getUserLocations({});

  const { dict, lang } = useLanguage();

  const COLUMNS = [
    {
      dataIndex: "status",
      key: "status",
      sorter: false,
      title: dict["Status"],
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
            {dict[(status ?? "unknown") as keyof Dictionary]}
          </Badge>
        );
      },
    },
    {
      dataIndex: "name",
      key: "name",
      sorter: false,
      title: dict["Name"],
      render: (name: unknown) => <strong>{String(name)}</strong>,
    },
    {
      dataIndex: "category",
      key: "category",
      sorter: false,
      title: dict["Category"],
      render: (category: unknown) => (
        <>{dict[category as keyof Dictionary] ?? "-"}</>
      ),
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
                locale: lang === "uk" ? uk : enUS,
              })}
            </span>
          </Tooltip>
        ) : (
          "-"
        ),
      title: dict["Created"],
    },
  ];

  return (
    <Column>
      <Row className="mb-4 justify-end">
        <ShareLocationLink asButton />
      </Row>
      {error ? (
        error.message
      ) : (
        <Table
          emptyStateHeading={dict["No places added yet"]}
          emptyStateBodyMessage={
            dict[
              "You haven't added any locations yet. Click the button above to add your first location and start managing your places!"
            ]
          }
          columns={COLUMNS}
          dataSource={data}
          loading={loading}
          rowKey="id"
        />
      )}
    </Column>
  );
};

export default MyLocations;
